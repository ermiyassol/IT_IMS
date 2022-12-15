import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { Device } from '../../../model/device.model';
import { History } from '../../../model/history.model';
import { DeviceService } from '../../../service/device.service';
import { DeviceStoreService } from '../../../store/device-store.service';

@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.scss']
})
export class SingleFormComponent implements OnInit {
  mainForm!: UntypedFormGroup;
  issueForm!: UntypedFormGroup;
  stateForm!: UntypedFormGroup;
  brands: string[] = [];
  models: string[] = [];
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
      brand: "",
      serialNumber: "",
      assetTagNumber: "",
      model: "",
      status: "New",
    })
    this.models = [];
    this.formSubmitted = false;
  }

  brandChanged(param: string = "") {
    this.models = this.deviceStoreService.getModels(param == ""? this.mainForm.value.brand : param);
    console.log(this.models);
  }

  empStatusChanged() {
    console.log("selected Employee Status", this.issueForm.value.empStatus);
    this.companies = this.deviceStoreService.getCompany(this.issueForm.value.empStatus);
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
    else if (status == "returned" && this.previousStatus == "issued") {
      return this.deviceService.returnDevice(this.stateForm.value, this.mainForm.value, this.updatedId)
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
      else if(this.mainForm.value.status == "new" || this.mainForm.value.status == "under maintenance") { return true; }
      else { return false; }
    } else { return false; }
  }

  backToHome() {
    this.routes.navigate(['../../'], {relativeTo: this.route});
  }

  constructor(private route: ActivatedRoute, private routes: Router, private message: MessageService, private deviceService: DeviceService, private fb: UntypedFormBuilder, private deviceStoreService: DeviceStoreService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
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
        // fetchModel function
        this.brandChanged(this.deviceDetail[0].brand);
        this.employeeDetail = this.deviceService.findEmployeeByDevice(this.updatedId);
      }
    }

    const pathArr = location.pathname.split("/");
    this.formUse = pathArr[pathArr.length - 1];

    this.mainForm = this.fb.group({
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
      city: [this.employeeDetail.length > 0 ? this.employeeDetail[0].city: ""]
    });

    this.stateForm = this.fb.group({
      actionDate: [new Date().toLocaleDateString(), [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.brands = this.deviceStoreService.getBrands();
    console.log(this.brands);
    this.status = this.deviceStoreService.getStatus();
    this.issuingRemarks = this.deviceStoreService.getIssuingRemark();
    this.cities = this.deviceStoreService.getCity();

  }
}