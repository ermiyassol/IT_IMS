import { Injectable } from '@angular/core';
import { Account } from 'src/app/features/setting/model/account.model';
import { Device } from '../../features/device/model/device.model';
import { Employee } from '../../features/device/model/employee.model';
import { History } from '../../features/device/model/history.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
private Purchases: any[] = [];
private deviceTypes: any[] = [];
private deviceBrands: any[] = [];
private deviceModels: any[] = [];
private deviceStatus = ["new", "issued", "under maintenance", "damaged", "returned", "lost"];
private issuingRemarks = ["new joiners", "temporary", "expat", "training", "shop", "test", "other"];
private company: any[] = [];
private city = ["addis ababa", "bahirdar", "gonder", "jimma", "gambela", "hawassa", "adama", "dilla", "sodo", "arba minch", "dessie"];
private Devices: Device[] = [];
private Employees: Employee[] = [];
private deviceHistory: History[] = [];
private accounts: Account[] = [];
private accessory: any[] = [];
private record: any[] = [];
private session: any = null;

getBrandName(id: string) {
  const index = this.deviceBrands.findIndex(brand => brand.id == id);
  return index >= 0 ? this.deviceBrands[index].brandName : "";
}

setSession(data: any[]) { 
  this.session = data; 
  this.saveLocalStorage(this.session) }
getSession() { 
  if(this.session) {
    return {status: true, user: this.session}
  } else {
    return this.getLocalStorage();
  }
}

getUsername() {return this.session.userName.replace(".", " ");}
getRoles() { 
  if(this.session) {
    return this.session.role;
  } else {
    this.getLocalStorage();
    return this.session.role;
  }
   }
deleteSession() { this.session = null; localStorage.removeItem("session"); }
saveLocalStorage(data: any) {
  const jsonFile = JSON.stringify(data);
  localStorage.setItem("session", jsonFile);
}

getLocalStorage() {
  const jsonFile = localStorage.getItem("session");
  if(!jsonFile) {return {status: false, user: null}; }

  const user = JSON.parse(jsonFile);
  this.setSession(user);
  return {status: true, user: user};
}

setRecord(data: any[]) { this.record = data; }
addRecord(newData: any) { this.record.push(newData); }
getAllRecord() { return this.record.slice(); }
deleteRecord(id: string) {
  const index = this.record.findIndex(item => item.id == id);
  this.record.splice(index, 1);
}
updateRecord(newData: any) {
  const index = this.record.findIndex(item => item.id == newData.id);
  this.record[index] = newData;
}


setAccessory(data: any[]) { this.accessory = data; }
addAccessory(newData: any) { this.accessory.push(newData); }
getAllAccessory() { return this.accessory.slice(); }
deleteAccessory(id: string) {
  const index = this.accessory.findIndex(item => item.id == id);
  this.accessory.splice(index, 1);
}
updateAccessory(newData: any) {
  const index = this.accessory.findIndex(item => item.id == newData.id);
  this.accessory[index] = newData;
}


getBrandId(brandName: string) {
  const index = this.deviceBrands.findIndex(brand => brand.brandName == brandName);
  return this.deviceBrands[index].id;
}

getPoId(po: number) {
  const index = this.Purchases.findIndex(PO => PO.purchaseOrder == po);
  return this.Purchases[index].id;
}

getStringValues() {
  const field = {
    models: this.deviceModels.map(model => model.model),
    brands: this.deviceBrands.map(brand => brand.brandName),
    deviceTypes: this.deviceTypes,
    po: this.Purchases.map(po => po.purchaseOrder )
  }

  return field
}

setPurchase(data: any[]) { this.Purchases = data; }
addPurchase(newData: any) { this.Purchases.push(newData); }
getAllPurchases() { return this.Purchases.slice(); }
deletePurchase(id: string) {
  const index = this.Purchases.findIndex(purchase => purchase.id == id);
  this.Purchases.splice(index, 1);
}


setAccount(data: Account[]) { this.accounts = data; }
addAccount(newData: Account) { this.accounts.push(newData); }
getAllAccount() { return this.accounts.slice(); }
updateAccount(newData: Account) {
  const index = this.accounts.findIndex(account => account.id == newData.id);
  this.accounts[index] = newData;
}
deleteAccount(id: string) {
  const index = this.accounts.findIndex(account => account.id == id);
  this.accounts.splice(index, 1);
}

getAllCompany() { return this.company.slice(); }
getAllBrands() { return this.deviceBrands.slice(); }
getAllModels() { return this.deviceModels.slice(); }
getDeviceType() { return this.deviceTypes.slice(); }
setDeviceType(data: any) { this.deviceTypes = data; }
setDeviceBrand(data: any) { this.deviceBrands = data; }
setDeviceModel(data: any) { this.deviceModels = data; }
setCity(data: any) { this.city = data; }
setCompany(data: any) { this.company = data; }

addCompany(newData: any) {
  this.company.unshift(newData);
}

addDeviceBand(newData: any) {
  this.deviceBrands.unshift(newData);
}

addDeviceModel(newData: any) {
  this.deviceModels.unshift(newData);
}

// History
addHistory(newHistory: History) {
  this.deviceHistory.unshift(newHistory);
}

getHistory() {
  return this.deviceHistory.slice();
}

setHistory(historyList: History[]) {
  this.deviceHistory = historyList;
  this.deviceHistory.reverse()
}

// Employee
updateEmployee(newData: Employee, id: string) {
  const index = this.Employees.findIndex(employee => employee.id == id);
  this.Employees[index].companyId = newData.companyId;
  this.Employees[index].deviceId = newData.deviceId;
  this.Employees[index].fullName = newData.fullName;
  this.Employees[index].role = newData.role;
  this.Employees[index].issueDate = newData.issueDate;
  this.Employees[index].remark = newData.remark;
  this.Employees[index].empStatus = newData.empStatus;
  this.Employees[index].company = newData.company;
  this.Employees[index].city = newData.city;
}

getEmployeeId(deviceId: string ) {
  return this.Employees.filter(employee => employee.deviceId == deviceId)[0].id;
}

findEmployee(id: string) {
  return this.Employees.filter(employee => employee.id == id);
}

findEmployeeByDevice(deviceId: string) {
  return this.Employees.filter(employee => employee.deviceId == deviceId);
}

countEmployee() {
  return this.Employees.length;
}

addEmployee(newEmployee: Employee) {
  this.Employees.unshift(newEmployee);
}

getEmployee() {
  return this.Employees.slice();
}

setEmployee(employeeList: Employee[]) {
  this.Employees = employeeList;
  this.Employees.reverse()
}

// Device
updateDevice(newData: Device, id: string) {
  const index = this.Devices.findIndex(device => device.id == id);
  console.log(newData);
  console.log(this.Devices[index]);
  this.Devices[index].brand = newData.brand;
  this.Devices[index].model = newData.model;
  this.Devices[index].serialNumber = newData.serialNumber;
  this.Devices[index].assetTagNumber = newData.assetTagNumber;
  this.Devices[index].status = newData.status;
}

findDevice(id: string) {
  return this.Devices.filter(device => device.id == id);
}

countDevice() {
  return this.Devices.length;
}

addDevice(newDevice: Device) {
  this.Devices.unshift(newDevice);
}

getDevice() {
  return this.Devices.slice();
}

setDevice(deviceList: Device[]) {
  this.Devices = deviceList;
  this.Devices.reverse()
}

getCity(): string[] {
  return this.city.slice();
}

getCompany(empStatus: string): string[] {
  return this.company.filter(company => company.employmentType == empStatus).map(company => company.title);
}

getBrands(deviceType: string): string[] {
  return this.deviceBrands.filter(device => device.deviceType == deviceType);
  // return this.deviceBrands.slice();
}

getStatus(): string[] {
  return this.deviceStatus.slice();
}

getIssuingRemark(): string[] {
  return this.issuingRemarks.slice();
}

getModels(brandId: string): string[] {
  return this.deviceModels.filter(device => device.brandId == brandId).map(model => model.model);
}

constructor() { }

}
