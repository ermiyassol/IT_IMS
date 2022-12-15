import { Injectable } from '@angular/core';
import { Device } from '../model/device.model';
import { Employee } from '../model/employee.model';
import { History } from '../model/history.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceStoreService {
private deviceBrands = ["lenovo", "hp", "dell" ];
private deviceModels = [{brand: "lenovo", models: ["thinkpad", "thinkbook", "thinkpad x1"]}, {brand: "hp", models: ["pavilion"]}, {brand: "dell", models: []}];
private deviceStatus = ["new", "issued", "under maintenance", "damaged", "returned"];
private issuingRemarks = ["new joiners", "temporary", "expat"];
private company = {staff: ["safaricom ethiopia", "safaricom kenya", "vodacom"], vendor: ["gebeya", "excellerent", "exceed", "nokia", "ison", "huawei", "bollore"]};
private city = ["addis ababa", "bahirdar", "gonder", "jimma", "gambela", "hawassa", "adama", "dilla", "sodo", "arba minch", "dessie"];
private Devices: Device[] = [];
private Employees: Employee[] = [];
private deviceHistory: History[] = [];

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
  if(empStatus == "Staff") {
    return this.company.staff.slice();
  } else if(empStatus == "Contractor") {
    return this.company.vendor.slice();
  } else { 
    return [];
  }
}


getBrands(): string[] {
  return this.deviceBrands.slice();
}

getStatus(): string[] {
  return this.deviceStatus.slice();
}

getIssuingRemark(): string[] {
  return this.issuingRemarks.slice();
}

getModels(brand: string): string[] {
  const filteredResponse = this.deviceModels.filter(device => device.brand == brand);
  if(filteredResponse.length) {
    return filteredResponse[0].models
  } else {
    return [];
  }
}

constructor() { }

}
