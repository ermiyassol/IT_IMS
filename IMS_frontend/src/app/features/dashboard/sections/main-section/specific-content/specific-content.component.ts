import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-specific-content',
  templateUrl: './specific-content.component.html',
  styleUrls: ['./specific-content.component.scss']
})
export class SpecificContentComponent implements OnInit {
  @Input() heading = "";
  deviceStatus: any[] = [];
  deviceBrands: any[] = [];
  deviceModels: any[] = [];
  employeeCompany: any[] = [];
  employeeCity: any[] = [];
  devicesPO: any[] = [];
  selectedBrandId: string = "";
  listOfBrands: any[] = [];

  brandChanged() {
    this.deviceModels = [];
    this.dashboardService.fetchSpecificModelStat(this.selectedBrandId).then((response: any) => {
      this.deviceModels = response;
    })
  }
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.fetchSpecificStat(this.heading).then((response: any) => {
      this.deviceStatus = response.deviceStatus;
      this.deviceBrands = response.deviceBrands;
      this.employeeCompany = response.employeeCompany;
      this.employeeCity = response.employeeCity;
      this.devicesPO = response.devicesPO;

      console.log("New Response");
      console.log("heading", this.heading);
      console.log("response", response);
    });

    

    this.listOfBrands = this.dashboardService.getBrands(this.heading);
    if(this.listOfBrands.length > 0) { 
      this.selectedBrandId = this.listOfBrands[0].brandId;
      this.brandChanged();
     }
  }
}
