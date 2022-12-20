import { Injectable } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { ApiService } from '../API/api.service';
import { Device } from '../model/device.model';
import { Employee } from '../model/employee.model';
import { History } from '../model/history.model';
import { DeviceStoreService } from '../store/device-store.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

constructor(private API: ApiService, private STORE: DeviceStoreService) { }

addDevice = (formData: any) => {
  return new Promise((resolve, reject) => {
    const newDevice = new Device(formData.brand, formData.serialNumber, formData.assetTagNumber, formData.model, formData.status);
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
        city: empData ? empData.city : "",
    }
  })

  return data;
}


private fetchAllDevice = () => {
  // todo count and fetch
  return new Promise<Device[]>((resolve, reject) => {
    const localCount = this.STORE.countDevice();
    this.API.countDevice().then(response => {
      if(response == localCount) {
        console.log("if clause");
        resolve(this.STORE.getDevice());
      } else {
        console.log("else clause");
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
        console.log("if clause");
        resolve(this.STORE.getEmployee());
      } else {
        console.log("else clause");
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
    const updatedDevice = new Device(formData.brand, formData.serialNumber, formData.assetTagNumber, formData.model, formData.status);
    console.log("updated Device detail", updatedDevice);
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

issueDevice(id: string, devData: Device, empData: any) {
  return new Promise((resolve, reject) => {
    const newEmployee = new Employee(empData.companyId, id, empData.fullName, empData.designation, empData.date, empData.issuingRemark, empData.empStatus, empData.company, empData.city);
    const newHistory = new History(empData.date, "issued", id, `Employee ID - ${empData.companyId} / Full Name - ${empData.fullName} / Role - ${empData.designation} / Employment Status - ${empData.empStatus} / Company - ${empData.company} / City - ${empData.city}`, "Desalegn Sebhatu"); // todo actionBy should be dynamic
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
    console.log(formData);
    const empId = this.STORE.getEmployeeId(deviceId);
    const newHistory = new History(formData.actionDate, currentStatus, deviceId, formData.description, "Desalegn Sebhatu"); // todo actionBy should be dynamic
    this.updateDevice(devData, deviceId).then(response => {
      this.API.deleteEmployee(empId!).then(response => {
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
    const newHistory = new History(formData.actionDate, devData.status, deviceId, formData.description, "Desalegn Sebhatu"); // todo actionBy should be dynamic
    console.log(newHistory);
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

}