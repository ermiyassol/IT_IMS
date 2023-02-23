import { Injectable } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { DeviceApiService } from '../API/device-api.service';
import { Device } from '../model/device.model';
import { Employee } from '../model/employee.model';
import { History } from '../model/history.model';
import { StoreService } from '../../../shared/store/store.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  selectedDeviceData: Device[] = [];
  multiDeviceNotifier = new Subject<string>();

constructor(private API: DeviceApiService, private STORE: StoreService) { }

getAccessory() { return this.STORE.getAllAccessory(); }

setSelection(data: number[]) {
  this.selectedDeviceData = [];
  data.forEach(id => {
    const device = this.STORE.findDevice(id.toString());
    if(device.length > 0) { this.selectedDeviceData.push(device[0]); }
  })
}

getSelectedDevice() {
  return this.selectedDeviceData.slice();
}

resetSelectedDevice() { this.selectedDeviceData = []; }

issueMultipleDevice(devices: Device[], empData: Employee) {
  return new Promise((resolve, reject) => [
    devices.forEach((device, index, data) => {
      setTimeout(() => {
        device.status = "issued";
        this.issueDevice(device.id!, device, empData).then(() => {
          this.multiDeviceNotifier.next(device.id!)
          if(index == data.length - 1) { resolve(true); }
        })
      }, 1000);

    })
  ])
}

validateBulkData(data: any[]) {
  const value = this.STORE.getStringValues();
  // console.log("string values validator", value);

  const errorFields = data.map((dataItem: any) => {
    if(!dataItem.hasOwnProperty("purchaseOrder") || !dataItem.hasOwnProperty("deviceType") || !dataItem.hasOwnProperty("brand") || !dataItem.hasOwnProperty("model") || !dataItem.hasOwnProperty("serialNumber") || !dataItem.hasOwnProperty("assetTagNumber")) {
      return {status: false, data: dataItem, message: "No empty field is acceptable"}
    }

    if(!value.po.includes(dataItem.purchaseOrder.toString())) {
      return {status: false, data: dataItem, message: "Wrong Purchase Order Value"}
    }

    if(!value.deviceTypes.includes(dataItem.deviceType)) {
      return {status: false, data: dataItem, message: "Wrong Device Type Value"}
    }

    if(!value.brands.includes(dataItem.brand)) {
      return {status: false, data: dataItem, message: "Wrong Brand Value"}
    }

    if(!value.models.includes(dataItem.model)) {
      return {status: false, data: dataItem, message: "Wrong Model Value"}
    }
    return;
  })
  return errorFields.filter(field => { if(field) { return field; } return;});
} 

deviceBulkUpload(data: any[]) {
  return new Promise((resolve, reject) => {
    if(data.length < 1) { reject({status: false, data: null, message: "The file is empty"})} else {
      const errorFields = this.validateBulkData(data);
      if(errorFields.length > 0) {
        reject({status: false, data: errorFields, message: "Listed rows have respective errors"});
      } else {
        const requestBody = data.map(reqBody => {
          return {
            poId: this.STORE.getPoId(reqBody.purchaseOrder).toString(),
            deviceType: reqBody.deviceType,
            brand: this.STORE.getBrandId(reqBody.brand).toString(),
            serialNumber: reqBody.serialNumber,
            assetTagNumber: reqBody.assetTagNumber,
            model: reqBody.model,
            status: "new",
          }
        });

        this.API.bulkAddDevice(requestBody).then((devices: any) => {
          // todo send to store
          devices.forEach((device: Device) => {
            this.STORE.addDevice(device);
          });

          resolve(devices.length + " Devices Added Successfully");
        })
        // todo send it to API
      }
    }

  })
}

getTableValidators() {
 return new Promise((resolve, reject) => {
  const response = {
    brands: this.STORE.getAllBrands(),
    purchaseOrders: this.STORE.getAllPurchases()
  };

  resolve(response);
 })
}

addDevice = (formData: any) => {
  return new Promise((resolve, reject) => {
    const newDevice = new Device(formData.poId, formData.deviceType, formData.brand, formData.serialNumber, formData.assetTagNumber, formData.model, formData.status);
    this.API.addDevice(newDevice).then((response: any) => {
      this.STORE.addDevice(response);
      resolve(true);
    }, error => {
      reject(error);
    })
    
  });
}

fetchAll() {
  return new Promise<any[]>((resolve, reject) => {
    this.fetchAllEmployee().then(empReponse => {
      this.fetchAllDevice().then(devResponse => {
        const data: any[] = this.DeviceResponseFormatter(empReponse, devResponse);
        resolve(data);
      })
    })
  })
}

DeviceResponseFormatter(employees: Employee[], devices: Device[]): any[] {
  const data = devices.map(device => {
    const empData = employees.find(employee => employee.deviceId == device.id);
    return {
        poId: device.poId,
        deviceType: device.deviceType,
        brand: device.brand,
        serialNumber: device.serialNumber,
        assetTagNumber: device.assetTagNumber,
        model: device.model,
        status: device.status,
        deviceId: device.id,
        employeeId: empData ? empData.id : "",
        fullName: empData ? empData.fullName : "stock",
        role: empData ? empData.role : "",
        remark: empData ? empData.remark : "",
        empStatus: empData ? empData.empStatus : "",
        company: empData ? empData.company : "",
        accessory: empData ? empData.accessory : "",
        city: empData ? empData.city : "",
        checked: false
    }
  })
  return data.reverse();
}


private fetchAllDevice = () => {
  // todo count and fetch
  return new Promise<Device[]>((resolve, reject) => {
    const localCount = this.STORE.countDevice();
    this.API.countDevice().then(response => {
      if(response == localCount) {
        resolve(this.STORE.getDevice());
      } else {
        this.API.fetchAllDevice().then((allDevices: any) => {
          this.STORE.setDevice(allDevices);
          resolve(allDevices);
        })
      }
    })
  })
}

private fetchAllEmployee = () => {
  // todo count and fetch
  return new Promise<Employee[]>((resolve, reject) => {
    const localCount = this.STORE.countEmployee();
    this.API.countEmployee().then(response => {
      if(response == localCount) {
        resolve(this.STORE.getEmployee());
      } else {
        this.API.fetchAllEmployee().then((allEmployees: any) => {
          this.STORE.setEmployee(allEmployees);
          resolve(allEmployees);
        })
      }
    })
  })
}

findDevice(id: string) {
  return this.STORE.findDevice(id);
}

updateDevice(formData: any, id: string) {
  return new Promise((resolve, reject) => {
    const updatedDevice = new Device(formData.poId, formData.deviceType, formData.brand, formData.serialNumber, formData.assetTagNumber, formData.model, formData.status);
    this.API.updateDevice(updatedDevice, id).then((response: any) => {
      // this.STORE.addDevice(response);
      // console.log("Test", updatedDevice);
      this.STORE.updateDevice(updatedDevice, response.deviceId);
      resolve(true);
    }, error => {
      reject(error);
    })
  });
}

// todo 1, work on the backend, 2. check if it is supported by the multiple issue
issueDevice(deviceId: string, devData: Device, empData: any) {
  return new Promise((resolve, reject) => {
    const id = deviceId.toString();
    // const accessory = empData.accessory.map((item: any) => { return item.name }).join("|"); // todo should be at the backend
    const actionBy = this.STORE.getUsername();
    const newEmployee = new Employee(empData.companyId, id, empData.fullName, empData.designation, empData.date, empData.issuingRemark, empData.empStatus, empData.company, empData.city, empData.accessory);
    const newHistory = new History(empData.date, "issued", id, `Employee ID - ${empData.companyId} / Full Name - ${empData.fullName} / Role - ${empData.designation} / Employment Status - ${empData.empStatus} / Company - ${empData.company} / City - ${empData.city}`, actionBy); // todo actionBy should be dynamic
    this.updateDevice(devData, id).then((response: any) => {
      this.API.addEmployee(newEmployee).then((empResponse: any) => {
        this.STORE.addEmployee(empResponse);
        this.addHistory(newHistory).then(response => {
          resolve("New device issued for " + empData.fullName + ".");
        }, error => reject(error))
      }, error => reject(error))
      
    }, error => {
      reject(error);
    })
  })
}

returnDevice(formData: History, devData: Device, deviceId: string, currentStatus: string) {
  return new Promise((resolve, reject) => {
    const empId = this.STORE.getEmployeeId(deviceId);
    const actionBy = this.STORE.getUsername();
    const newHistory = new History(formData.actionDate, currentStatus, deviceId, formData.description, actionBy); // todo actionBy should be dynamic
    this.updateDevice(devData, deviceId).then(response => {
      this.API.deleteEmployee(empId!, currentStatus).then(response => {
        this.addHistory(newHistory).then(response => {
          resolve("Device returned successfully.");
        }, error => reject(error))
      }, error => reject(error));
    })
  })
}

changeStatus(formData: History, devData: Device, deviceId: string, ) {
  return new Promise((resolve, reject) => {
    // console.log(formData);
    const actionBy = this.STORE.getUsername();
    const newHistory = new History(formData.actionDate, devData.status, deviceId, formData.description, actionBy); // todo actionBy should be dynamic
  this.updateDevice(devData, deviceId).then(response => {
    this.addHistory(newHistory).then(response => {
      resolve("Device status changed successfully.");
    }, error => reject(error))
  }, error => reject(error));
  })
}

private addHistory(newHistory: History) {
  return new Promise((resolve, reject) => {
    this.API.addHistory(newHistory).then(response => {
      // todo add to current histry holder method to the store
      this.STORE.addHistory(newHistory);
      resolve("Device status changed successfully.")
    }, error => reject(error));
  })
}

getHistory() {
  return this.STORE.getHistory();
}

findHistory(deviceId: string) {
  return new Promise((resolve, reject) => {
    this.API.findHistory(deviceId).then((response: any) => {
      this.STORE.setHistory(response);
      resolve(response);
    })
  })
}

findEmployeeByDevice(deviceId: string) {
  return this.STORE.findEmployeeByDevice(deviceId);
}

downloadBulkTemplate() {
  return new Promise((resolve, reject) => {
    this.API.downloadBulkTemplate().then(() => resolve(true), errorMessage => reject(errorMessage))
  })
}

}