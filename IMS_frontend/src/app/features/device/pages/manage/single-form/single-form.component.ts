import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { Device } from '../../../model/device.model';
import { History } from '../../../model/history.model';
import { DeviceService } from '../../../service/device.service';
import { StoreService } from '../../../../../shared/store/store.service';
import { compileNgModule } from '@angular/compiler';
import { FileUploader } from 'ng2-file-upload';
import { API } from 'src/app/shared/services/api.store';

const URL = 'http://localhost:8080/api/upload';
@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.scss']
})
export class SingleFormComponent implements OnInit {
  mainForm!: UntypedFormGroup;
  issueForm!: UntypedFormGroup;
  stateForm!: UntypedFormGroup;
  brands: any[] = [];
  models: any[] = [];
  status: string[] = [];
  issuingRemarks: string[] = [];
  formSubmitted = false;
  companies: string[] = [];
  cities: string[] = [];
  editFields = false;
  formUse = "";
  editSubFields = false;
  previousStatus = "";
  isLoading = false;
  deviceDetail: Device[] = [];
  updatedId = "";
  deviceHistory: History[] = [];
  employeeDetail: any = [];
  deviceTypes: string[] = [];
  purchaseOrders: any[] = [];
  selectedDeviceDetail: any[] = [];
  issueFormVisibility = true;
  uploader: FileUploader = new FileUploader({
    url: this.api.uploadLiabilityForm +"/1",
    // itemAlias: this.employeeDetail[0].id + ".pdf",
    itemAlias: "file",
    additionalParameter: { id: "it works"}
  });
  issueFormEdit = false;

  downloadSignedLiabilityForm() {
    const name = this.employeeDetail[0].fullName;
    const id = this.employeeDetail[0].id;
    this.deviceService.downloadSignedLiabilityDoc(name, id).then(() => {}, error => this.message.display("error", error));
  }

  editIssueFields() {
    this.issueFormEdit = true;
    console.log("Updated Form - ", this.issueForm.value);
  }

  updateIssueField() {
  }

  accessoryChanged(accessories: any[]) {
    let accessoryDetail: any[] = [];
    accessories.forEach(item => {
      if(item.checked) {
        accessoryDetail.push({name: item.value, type: item.type});
      }
    })
    
    this.issueForm.patchValue({accessory: accessoryDetail})
  }

  deleteDevice(id: string) {
    const index = this.selectedDeviceDetail.findIndex(device => device.id == id);
    if(index > -1) { this.selectedDeviceDetail.splice(index, 1); }
  }

  issueDevices() {
    // todo Validate the issueing form and create an API and service to takecare of it
    console.log("devices - ", this.selectedDeviceDetail);
    this.formSubmitted = true;
    if(this.issueForm.valid) {
      this.deviceService.issueMultipleDevice(this.selectedDeviceDetail, this.issueForm.value).then(() => {
        this.message.display("success", "Devices Issued Successfully");
        this.issueFormVisibility = false;
        this.issueForm.reset();
        this.isLoading = false;
    })
    }
    // else {
    //   console.log("Form Invalid!");
    // }
  }

  editDetails() {
    this.editFields = true;
  }

  changeStatus(newStatus: string) {
    this.editSubFields = true;
    this.previousStatus = this.mainForm.value.status;
    this.mainForm.patchValue({status: newStatus})
  }

  cancelUpdate() {
    if(this.editSubFields) {
      this.mainForm.patchValue({status: this.previousStatus})
      this.editSubFields = false;
      this.previousStatus = "";
    } else if(this.editFields) {
      const previousData = this.deviceDetail[0];
      this.mainForm.setValue({
        poId: previousData.poId,
        deviceType: previousData.deviceType,
        brand: previousData.brand,
        serialNumber: previousData.serialNumber,
        assetTagNumber: previousData.assetTagNumber,
        model: previousData.model,
        status: previousData.status,
      });
      this.editFields = false;
    } else {}
  }

  resetMainField() {
    this.mainForm.setValue({
      poId: "",
      deviceType: "",
      brand: "",
      serialNumber: "",
      assetTagNumber: "",
      model: "",
      status: "new",
    })
    this.models = [];
    this.brands = [];
    this.formSubmitted = false;
  }

  brandChanged(param: string = "") {
    this.models = this.storeService.getModels(param == ""? this.mainForm.value.brand : param);
  }

  deviceTypeChanged(param: string = "") {
    this.brands = this.storeService.getBrands(param == ""? this.mainForm.value.deviceType : param);
  }

  empStatusChanged() {
    this.companies = this.storeService.getCompany(this.issueForm.value.empStatus.toLowerCase());
  }

  private addDevice() {
    this.deviceService.addDevice(this.mainForm.value).then(response => {
      // todo stop loading effect
      this.isLoading = false;
      // todo perform success message
      this.message.display("success", "New device added successfully.")
      // todo reset form
      this.resetMainField();
      // ! todo  redirect to table page
    }, errorMessage => {
      this.isLoading = false;
      this.message.display("error", errorMessage);
    });
  }

  private updateMainField() {
    this.deviceService.updateDevice(this.mainForm.value, this.updatedId).then(response => {
      // todo stop loading effect
      this.isLoading = false;
      // todo perform success message
      this.message.display("success", "Device info updated successfully.")
      // todo reset form
      this.editFields = false;
      // ! todo  redirect to table page
    }, errorMessage => {
      this.isLoading = false;
      this.message.display("error", errorMessage);
    });
  }

  private submitSubFields() {
    const status = this.mainForm.value.status;
    if(status == "issued") {
      return this.deviceService.issueDevice(this.updatedId, this.mainForm.value, this.issueForm.value);
    } 
    else if (status == "returned" && this.previousStatus == "issued" || status == "damaged" && this.previousStatus == "issued") {
      return this.deviceService.returnDevice(this.stateForm.value, this.mainForm.value, this.updatedId, status)
    } 
    else {
      return this.deviceService.changeStatus(this.stateForm.value, this.mainForm.value, this.updatedId).then((successMessage: any) => {
        this.deviceHistory = this.deviceService.getHistory();
        this.message.display("success", successMessage);
      });
    }
  }

  submitForm = async () => {
    this.formSubmitted = true;
    if (this.formValidation()) {
      this.isLoading = true;
      if(this.editFields) {
        // main field updating method invoking
        this.updateMainField();
      } else if(this.editSubFields) {
        // sub fields updating method invoking
        this.submitSubFields().then((successMessage: any) => {
          this.isLoading = false;
          this.editSubFields = false;
          this.previousStatus = "";
          // this.message.display("success", successMessage);
        }, errorMessage => {
          this.isLoading = false;
          this.message.display("error", errorMessage);
        })
      } else {
        // new Device Adding Method invoking
        this.addDevice()
      }
      // todo use status checker and send if() {}
    } else {
      // todo send error message to fill the form
      this.message.display("error", "Please fill essential fields!");
    }
  }

  formValidation() {
    if(this.mainForm.valid) {
      if(this.mainForm.value.status == "issued" && this.issueForm.valid) { return true; } 
      else if(this.mainForm.value.status == "damaged" && this.stateForm.valid) { return true; }
      else if(this.mainForm.value.status == "returned" && this.stateForm.valid) { return true; }
      else if(this.mainForm.value.status == "lost" && this.stateForm.valid) { return true; }
      else if(this.mainForm.value.status == "new" || this.mainForm.value.status == "under maintenance") { return true; }
      else { return false; }
    } else { return false; }
  }

  backToHome() {
    this.routes.navigate(['main/device/view'],);
  }

  constructor(private api: API, private route: ActivatedRoute, private routes: Router, private message: MessageService, private deviceService: DeviceService, private fb: UntypedFormBuilder, private storeService: StoreService) {}

  displayPO(id: string) {
    return this.purchaseOrders.filter(po => po.id == id).map(po => po.purchaseOrder).join("");
  }

  displayBrand(id: string) {
    return this.brands.filter(brand => brand.id == id).map(brand => brand.brandName).join("");
  }

  private fetchData() {
    this.status = this.storeService.getStatus();
    this.issuingRemarks = this.storeService.getIssuingRemark();
    this.cities = this.storeService.getCity();
    this.deviceTypes = this.storeService.getDeviceType();
    this.purchaseOrders = this.storeService.getAllPurchases();
  }

  ngOnInit(): void {
    this.fetchData();

    const id = this.route.snapshot.paramMap.get('id');
    const detail = this.route.snapshot.paramMap.get('detail');

    this.selectedDeviceDetail = this.deviceService.getSelectedDevice().map(device => { return {...device, checked: false}});

    if(detail && this.selectedDeviceDetail.length == 0) { this.routes.navigate(["../../../view"], {relativeTo: this.route}); }

    if (id) {
      this.isLoading = true;
      this.updatedId = id;
      this.deviceDetail = this.deviceService.findDevice(id);
      this.deviceService.findHistory(id).then((response: any) => {
        this.deviceHistory = response;
        this.isLoading = false;
      })
      if(this.deviceDetail.length == 0) {
        this.routes.navigate(["../../"], {relativeTo: this.route});
      } else {
        // console.log(this.deviceDetail[0].id);
        this.deviceTypeChanged(this.deviceDetail[0].deviceType)
        this.brandChanged(this.deviceDetail[0].brand);
        this.employeeDetail = this.deviceService.findEmployeeByDevice(this.updatedId);
        this.uploader = new FileUploader({
          url: this.api.uploadLiabilityForm + "/" + this.employeeDetail[0].id,
          // itemAlias: this.employeeDetail[0].id + ".pdf",
          itemAlias: "file",
        });
      }
    }

    const pathArr = location.pathname.split("/");
    this.formUse = pathArr[pathArr.length - 1];

    this.mainForm = this.fb.group({
      poId: [this.deviceDetail.length > 0 ? this.deviceDetail[0].poId : "", [Validators.required]],
      deviceType: [this.deviceDetail.length > 0 ? this.deviceDetail[0].deviceType : "", [Validators.required]],
      brand: [this.deviceDetail.length > 0 ? this.deviceDetail[0].brand : "", [Validators.required]],
      serialNumber: [this.deviceDetail.length > 0 ? this.deviceDetail[0].serialNumber : "", [Validators.required]],
      assetTagNumber: [this.deviceDetail.length > 0 ? this.deviceDetail[0].assetTagNumber : "", [Validators.required]],
      model: [this.deviceDetail.length > 0 ? this.deviceDetail[0].model : "", [Validators.required]],
      status: [this.deviceDetail.length > 0 ? this.deviceDetail[0].status : "new", [Validators.required]],
    });

    this.issueForm = this.fb.group({
      date: [this.employeeDetail.length > 0 ? this.employeeDetail[0].issueDate: new Date().toLocaleDateString(), [Validators.required]],
      companyId: [this.employeeDetail.length > 0 ? this.employeeDetail[0].companyId: ""],
      fullName: [this.employeeDetail.length > 0 ? this.employeeDetail[0].fullName: "", [Validators.required]],
      designation: [this.employeeDetail.length > 0 ? this.employeeDetail[0].role: "", [Validators.required]],
      issuingRemark: [this.employeeDetail.length > 0 ? this.employeeDetail[0].remark: "", [Validators.required]],
      empStatus: [this.employeeDetail.length > 0 ? this.employeeDetail[0].empStatus: "", [Validators.required]],
      company: [this.employeeDetail.length > 0 ? this.employeeDetail[0].company: ""],
      city: [this.employeeDetail.length > 0 ? this.employeeDetail[0].city: ""],
      accessory: [this.employeeDetail.length > 0 ? this.employeeDetail[0].accessory: []]
    });

    this.stateForm = this.fb.group({
      actionDate: [new Date().toLocaleDateString(), [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.deviceService.multiDeviceNotifier.subscribe(deviceId => {
      const index = this.selectedDeviceDetail.findIndex(device => device.id == deviceId);
      this.selectedDeviceDetail[index].checked = true;
    })

    
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.message.display("success", 'File successfully uploaded!');
    };

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.deviceService.resetSelectedDevice();
  }
}