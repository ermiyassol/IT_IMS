import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-charts';
import { StoreService } from 'src/app/shared/store/store.service';
import { DashboardApiService } from '../API/dashboard-api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private STORE: StoreService, private dashboardApi: DashboardApiService) { }

getAccessories() { return this.STORE.getAllAccessory(); }

getBrands(deviceType: string) {
  return this.STORE.getAllBrands().filter(brand => brand.deviceType == deviceType).map(s => { return {brandId: s.id, brandName: s.brandName}});
}

getAllDeviceType() {
  return this.STORE.getDeviceType();
}

fetchTotalDeviceStat() {
  return new Promise((resolve, reject) => {
    this.dashboardApi.fetchTotalDeviceStat().then(response => {
      resolve(response)
    }, error => reject(error));
  })
}

fetchGeneralStat() {
  return new Promise((resolve, reject) => {
    this.dashboardApi.fetchGeneralStat().then(response => {
      resolve(response)
    }, error => reject(error));
  })
}

fetchSpecificStat(deviceType: string) {
  return new Promise((resolve, reject) => {
    this.dashboardApi.fetchSpecificStat(deviceType).then(response => {
      resolve(response)
    }, error => reject(error));
  })
}

fetchSpecificModelStat(brandId: string) {
  return new Promise((resolve, reject) => {
    this.dashboardApi.fetchSpecificModelStat(brandId).then(response => {
      resolve(response)
    }, error => reject(error));
  })
}
}
