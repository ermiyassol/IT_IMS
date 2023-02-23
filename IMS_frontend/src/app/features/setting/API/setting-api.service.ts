import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../shared/services/api.store';
import { Account } from '../model/account.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SettingApiService {

constructor(private api: API, private http: HttpClient) { }

// ACCESSORY
addAccessory = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.addAccessory, data).subscribe((response: any) => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add accessory!! Please try again.")
      }
    });
  });
};

updateAccessory = (id: string, data: any) => {
  return new Promise((resolve, reject) => {
    this.http.put<any>(this.api.updateAccessory + id, data).subscribe(response => {
      if(response.status) {
        resolve(response);
      } else {
        reject("There is no accessory!! Please try again.")
      }
    });
  });
};

deleteAccessory = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteAccessory + id).subscribe(response => {
      if(response.status) {
        resolve(response.accessoryId);
      } else {
        reject("There is no accessory!! Please try again.")
      }
    });
  });
};

fetchAllAccessory = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllAccessory).subscribe(response => {
      resolve(response);
    });
  });
};

// PURCHASE
addPurchase = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.addPurchase, data).subscribe((response: any) => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add purchase order!! Please try again.")
      }
    });
  });
};

deletePurchase = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deletePurchase + id).subscribe(response => {
      if(response.status) {
        resolve(response.purchaseId);
      } else {
        reject("There is no purchase order found!! Please try again.")
      }
    });
  });
};

fetchAllPurchase = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllPurchase).subscribe(response => {
      resolve(response);
    });
  });
};

// DEVICE
countAccount = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.countAccount).subscribe(response => {
      resolve(response);
    });
  });
};

addAccount = (data: Account) => {
  return new Promise((resolve, reject) => {
    this.http.post<Account>(this.api.addAccount, data).subscribe((response: any) => {
      if(response) {
        response.role = response.role.split(" | ");
        resolve(response);
      } else {
        reject("Failed to add account!! Please try again.")
      }
    });
  });
};

updateAccount = (data: any, id: string) => {
  return new Promise((resolve, reject) => {
    this.http.put<{status: number, accountId: String, updatedValues: Account}>(this.api.updateAccount + id, data).subscribe(response => {
      if(response.status = 1) {
        resolve(response);
      } else {
        reject("Wrong account ID!! Please try again.")
      }
    });
  });
};

fetchAllAccount = () => {
  return new Promise((resolve, reject) => {
    this.http.get<Account[]>(this.api.fetchAllAccount).pipe(map((data: any) => {
      console.log("data", data);
      return data.map((d: any) => {
        d.role = d.role ? d.role.split(" | ") : [];
        return d;
      })
    })).subscribe(response => {
      resolve(response);
    });
  });
};

findAccount = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.get<any>(this.api.findAccount + id).subscribe(response => {
      if(response.status) {
        resolve(response.accountData);
      } else {
        reject("There is no device found!! Please try again.")
      }
    });
  });
};

deleteAccount = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteAccount + id).subscribe(response => {
      if(response.status) {
        resolve(response.accountId);
      } else {
        reject("There is no device found!! Please try again.")
      }
    });
  });
};
// -----

updateCity = (data: string[]) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.updateCity, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add device!! Please try again.")
      }
    });
  });
};

fetchAllCity = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllCity).subscribe(response => {
      resolve(response);
    });
  });
};

addCompany = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.addCompany, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add company!! Please try again.")
      }
    });
  });
};

fetchAllCompany = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllCompany).subscribe(response => {
      resolve(response);
    });
  });
};

deleteCompany = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteCompany + id).subscribe(response => {
      if(response.status) {
        resolve(response.deviceId);
      } else {
        reject("There is no device found!! Please try again.")
      }
    });
  });
};

addDeviceBrand = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.addDeviceBrand, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add company!! Please try again.")
      }
    });
  });
};

fetchAllDeviceBrand = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllDeviceBrand).subscribe(response => {
      resolve(response);
    });
  });
};

deleteDeviceBrand = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteDeviceBrand + id).subscribe(response => {
      if(response.status) {
        resolve(response.deviceId);
      } else {
        reject("There is no device found!! Please try again.")
      }
    });
  });
};

addDeviceModel = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.addDeviceModel, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add company!! Please try again.")
      }
    });
  });
};

fetchAllDeviceModel = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllDeviceModel).subscribe(response => {
      resolve(response);
    });
  });
};

deleteDeviceModel = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteDeviceModel + id).subscribe(response => {
      if(response.status) {
        resolve(response.deviceId);
      } else {
        reject("There is no device found!! Please try again.")
      }
    });
  });
};

updateDeviceType = (data: string[]) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.updateDeviceType, data).subscribe(response => {
      if(response) {
        console.log("Setting API Response - ", response);
        resolve(response);
      } else {
        reject("Failed to add device!! Please try again.")
      }
    });
  });
};

fetchAllDeviceType = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllDeviceType).subscribe(response => {
      resolve(response);
    });
  });
};




// addDevice = (data: any) => {
//   return new Promise((resolve, reject) => {
//     this.http.post<any>(this.api.addDevice, data).subscribe(response => {
//       if(response) {
//         resolve(response);
//       } else {
//         reject("Failed to add device!! Please try again.")
//       }
//     });
//   });
// };

// fetchAllDevice = () => {
//   return new Promise((resolve, reject) => {
//     this.http.get<any[]>(this.api.fetchAllDevice).subscribe(response => {
//       resolve(response);
//     });
//   });
// };

// deleteDevice = (id: string) => {
//   return new Promise((resolve, reject) => {
//     this.http.delete<any>(this.api.deleteDevice + id).subscribe(response => {
//       if(response.status) {
//         resolve(response.deviceId);
//       } else {
//         reject("There is no device found!! Please try again.")
//       }
//     });
//   });
// };
}
