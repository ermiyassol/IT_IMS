import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/store/store.service';
import { DeviceService } from '../../device/service/device.service';
import { RecordService } from '../../record/record.service';
import { SettingService } from '../../setting/service/setting.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
loadedDataCount = 1;
maxDataCountLimit = 8;
constructor(private STORE: StoreService, private Settings: SettingService, private Devices: DeviceService, private Records: RecordService) {}

getSession() {
  return this.STORE.getSession();
}

loadData() {
  return new Promise((resolve, reject) => {
    this.Settings.fetchSettingData('city').then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
    this.Settings.fetchSettingData('device type').then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
    // this.Settings.fetchSettingData('role').then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++ }})
    this.Settings.fetchSettingData('device brand').then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
    this.Settings.fetchSettingData('device model').then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
    this.Settings.fetchSettingData('company').then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
    this.Settings.fetchPurchases().then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
    this.Settings.fetchAccessory().then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
    this.Records.fetchAllRecord().then(() => {if(this.loadedDataCount == this.maxDataCountLimit) { resolve(true) } else { this.loadedDataCount++; console.log(this.loadedDataCount); }})
  })
 }
}
