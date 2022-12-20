import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeInterval } from 'rxjs';
import { Device } from '../model/device.model';
import { API } from '../../../shared/services/api.store';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private api: API, private http: HttpClient) {}

// todo check if the server is up
// DEVICE
countDevice = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.countDevice).subscribe(response => {
      resolve(response);
    });
  });
};

addDevice = (data: Device) => {
  return new Promise((resolve, reject) => {
    this.http.post<Device>(this.api.addDevice, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add device!! Please try again.")
      }
    });
  });
};

updateDevice = (data: any, id: string) => {
  return new Promise((resolve, reject) => {
    this.http.put<{status: number, deviceId: String, updatedValues: Device}>(this.api.updateDevice + id, data).subscribe(response => {
      if(response.status = 1) {
        resolve(response);
      } else {
        reject("Wrong device ID!! Please try again.")
      }
    });
  });
};

fetchAllDevice = () => {
  return new Promise((resolve, reject) => {
    this.http.get<Device[]>(this.api.fetchAllDevice).subscribe(response => {
      resolve(response);
    });
  });
};

findDevice = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.get<any>(this.api.findDevice + id).subscribe(response => {
      if(response.status) {
        resolve(response.deviceData);
      } else {
        reject("There is no device found!! Please try again.")
      }
    });
  });
};

deleteDevice = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteDevice + id).subscribe(response => {
      if(response.status) {
        resolve(response.deviceId);
      } else {
        reject("There is no device found!! Please try again.")
      }
    });
  });
};

// EMPLOYEE
countEmployee = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.countEmployee).subscribe(response => {
      resolve(response);
    });
  });
};

addEmployee = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post(this.api.addEmployee, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add employee!! Please try again.")
      }
    });
  });
};

updateEmployee = (data: any, id: string) => {
  return new Promise((resolve, reject) => {
    this.http.put<any>(this.api.updateEmployee + id, data).subscribe(response => {
      if(response.status = 1) {
        resolve(response);
      } else {
        reject("Wrong employee ID!! Please try again.")
      }
    });
  });
};

fetchAllEmployee = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.fetchAllEmployee).subscribe(response => {
      resolve(response);
    });
  });
};

findEmployee = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.get<any>(this.api.findEmployee + id).subscribe(response => {
      if(response.status) {
        resolve(response.employeeData);
      } else {
        reject("There is no employee found!! Please try again.")
      }
    });
  });
};

deleteEmployee = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteEmployee + id).subscribe(response => {
      if(response.status) {
        resolve(response.employeeId);
      } else {
        reject("There is no employee found!! Please try again.")
      }
    });
  });
};


// HISTORY
countHistory = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.countHistory).subscribe(response => {
      resolve(response);
    });
  });
};

addHistory = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post(this.api.addHistory, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add history!! Please try again.")
      }
    });
  });
};

updateHistory = (data: any, id: string) => {
  return new Promise((resolve, reject) => {
    this.http.put<any>(this.api.updateHistory + id, data).subscribe(response => {
      if(response.status = 1) {
        resolve(response);
      } else {
        reject("Wrong history ID!! Please try again.")
      }
    });
  });
};

fetchAllHistory = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.fetchAllHistory).subscribe(response => {
      resolve(response);
    });
  });
};

findHistory = (id: string) => {
  return new Promise<History[]>((resolve, reject) => {
    this.http.get<any>(this.api.findHistory + id).subscribe(response => {
      if(response.status) {
        resolve(response.historyData);
      } else {
        resolve([])
      }
    });
  });
};

deleteHistory = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteHistory + id).subscribe(response => {
      if(response.status) {
        resolve(response.historyId);
      } else {
        reject("There is no history found!! Please try again.")
      }
    });
  });
};
}