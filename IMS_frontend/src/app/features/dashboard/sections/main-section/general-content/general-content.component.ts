import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-general-content',
  templateUrl: './general-content.component.html',
  styleUrls: ['./general-content.component.scss']
})
export class GeneralContentComponent implements OnInit {
  stockDevices: any[] = [];
  weeklyProgress: any[] = [];
  changeLogs: any[] = [];
  purchaseOrdersDetail: any[] = [];
  deviceTypes: string[] = [];
  accessories: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    console.log("general content field called!!");
    this.dashboardService.fetchGeneralStat().then((response: any) => {
      this.stockDevices = response.stockDevice;
      this.weeklyProgress = response.weeklyProgress;
      this.changeLogs = response.changeLogs;
      this.purchaseOrdersDetail = response.purchaseOrdersDetail;
    });

    this.deviceTypes = this.dashboardService.getAllDeviceType();
    this.deviceTypes.unshift('received at');
    this.deviceTypes.unshift('purchase order'); 

    this.accessories = this.dashboardService.getAccessories().map(accessory => {
      return {name: accessory.name, value: +accessory.new + +accessory.return};
    })
    // console.log("Accessories - ", this.accessories);
  }
}