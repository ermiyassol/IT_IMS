import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { StoreService } from 'src/app/shared/store/store.service';
import { Device } from '../../model/device.model';
import { DeviceService } from '../../service/device.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  totalPage = 100;
  currentPage = 1;
  pageSize = 10;
  devices: any[] = [];
  isLoading = false;
  searchKey = "";
  purchaseOrders: any[] = [];
  brands: any[] = [];
  selectedDevices: any[] = [];
  role = "";
  sortTitle = "";
  interval: any;

  search() {
    this.devices = this.deviceService.search(this.searchKey);
    // console.log("Data - ", data);
  }

  issueDevice() {
    this.deviceService.setSelection(this.selectedDevices);
    this.routes.navigate(['../issue/devices/confirm'], {relativeTo: this.route})
  }

  multipleSelection(event: any, deviceId: string) {
    if(event) {
      const index = this.devices.findIndex(device => device.deviceId == deviceId);
      const device = this.devices[index];
      if(device.status == "new" || device.status == "returned") {
        this.selectedDevices.push(device.deviceId);
      } else {
        this.message.display("error", "You can only select device which have New / Returned Status!")
        this.devices[index].checked = false;
      }
    } else {
      const index = this.selectedDevices.findIndex(id => id == deviceId);
      if(index > -1) {
        this.selectedDevices.splice(index, 1);
      }
    }
  }

  clearSelection() {
    this.selectedDevices.forEach(id => {
      const index = this.devices.findIndex(device => device.deviceId == id);
      this.devices[index].checked = false;
    })
    this.selectedDevices = [];
  }

  viewDetail(deviceId: string) {
    this.routes.navigate([`./${deviceId}/detail`], {relativeTo: this.route});
    console.log("Selected Device ID - ", deviceId);
  }

  displayPO(id: string) {
    return this.purchaseOrders.filter(po => po.id == id).map(po => po.purchaseOrder).join("");
  }

  displayBrands(id: string) {
    return this.brands.filter(brand => brand.id == id).map(brand => brand.brandName).join("");
  }

  sort() {
    if(this.sortTitle == "") {
      this.sortTitle = "ascend";
    } else if(this.sortTitle == "ascend") {
      this.sortTitle = "descend";
    } else {
      this.sortTitle = "";
    }

    if(this.sortTitle != "") {
      this.devices.sort(( a, b ) => {
        if ( a.updatedAt < b.updatedAt ){
          return this.sortTitle == "ascend" ? -1 : 1;
        }
        if ( a.updatedAt > b.updatedAt ){
          return this.sortTitle == "ascend" ? 1 : -1;
        }
        return 0;
      })
    } else {}
  }

  constructor(private STORE: StoreService, private route: ActivatedRoute, private routes: Router, private deviceService: DeviceService, private message: MessageService) { }

  ngOnInit() {
    this.role = this.STORE.getRoles();
    this.isLoading = true;
    this.deviceService.fetchAll().then((response: any[]) => {
      this.devices = response;
      this.isLoading = false;
    })

    // this.interval = setInterval(() => {
      this.deviceService.fetchAll().then((response: boolean) => {
        // this.devices = response;
        this.isLoading = false;
        console.log("Device Response");
      })
    // }, 10000);


    this.deviceService.getTableValidators().then((responseData: any) => {
      this.brands = responseData.brands;
      this.purchaseOrders = responseData.purchaseOrders
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
