import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/store/store.service';
import { SettingApiService } from '../API/setting-api.service';
import { Account } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

constructor(private API: SettingApiService, private STORE: StoreService) { }

updateAccessory(data: any) {
  return new Promise((resolve, reject) => {
    this.API.updateAccessory(data.id, {new: data.new, return: data.return}).then(response => {
      this.STORE.updateAccessory(data);
      resolve(true);
    }, error => { reject(error); })
  })
}

addAccessory(formData: any) {
  return new Promise((resolve, reject) => {
    this.API.addAccessory(formData).then((response: any) => {
      this.STORE.addAccessory(response);
      resolve(true);
    }, error => { reject(error); })
  })
}

fetchAccessory() {
  return new Promise<any[]>((resolve, reject) => {
    this.API.fetchAllAccessory().then((response: any) => {
      this.STORE.setAccessory(response);
      resolve(response);
    })
  })
}

deleteAccessory(id: string) {
  return new Promise((resolve, reject) => {
    this.API.deleteAccessory(id).then((response) => {
      this.STORE.deleteAccessory(id);
      resolve(true);
  }, error => reject(error))
  })
}

getAccessory() { return this.STORE.getAllAccessory(); }

// 
addPurchase(formData: any) {
  return new Promise((resolve, reject) => {
    this.API.addPurchase(formData).then((response: any) => {
      this.STORE.addPurchase(response);
      resolve(true);
    }, error => { reject(error); })
  })
}

fetchPurchases() {
  return new Promise<any[]>((resolve, reject) => {
    this.API.fetchAllPurchase().then((response: any) => {
      this.STORE.setPurchase(response);
      resolve(response);
    })
  })
}

deletePurchase(id: string) {
  return new Promise((resolve, reject) => {
    this.API.deletePurchase(id).then((response) => {
      this.STORE.deletePurchase(id);
      resolve(true);
  }, error => reject(error))
  })
}

getPurchase() {
  return this.STORE.getAllPurchases();
}

addAccount(formData: any) {
  return new Promise((resolve, reject) => {
    const newAccount = new Account(formData.userName, formData.role, true);
    this.API.addAccount(newAccount).then((response: any) => {
      this.STORE.addAccount(response);
      resolve(true);
    }, error => { reject(error); })
  })
}

fetchAccounts() {
  return new Promise<any[]>((resolve, reject) => {
    this.API.fetchAllAccount().then((response: any) => {
      this.STORE.setAccount(response);
      resolve(response);
    })
  })
}

updateAccount(formData: any) {
  return new Promise((resolve, reject) => {
    const updatedAccount = new Account(formData.userName, formData.role.join(" | "), formData.status, formData.id);
    this.API.updateAccount(updatedAccount, formData.id).then(response => {
      updatedAccount.role = formData.role;
      this.STORE.updateAccount(updatedAccount)
      resolve(true);
  }, error => reject(error))
  })
}

deleteAccount(id: string) {
  return new Promise((resolve, reject) => {
    this.API.deleteAccount(id).then((response) => {
      this.STORE.deleteAccount(id);
      resolve(true);
  }, error => reject(error))
  })
}

fetchFromStore() {
  return this.STORE.getAllAccount();
}

// this method will be invoked when adding and delete function triggered
updateIndependent(type: string, data: string[]) {
  return new Promise((resolve, reject) => {
    if(type == 'city') {
      this.API.updateCity(data).then(response => { this.STORE.setCity(data); resolve(data); }, errorMessage => reject(errorMessage) )
    } else if(type == 'device type') {
      this.API.updateDeviceType(data).then(response => { this.STORE.setDeviceType(data); resolve(data); }, errorMessage => reject(errorMessage) )
    } else if(type == 'role') {
      // this.API.updateCity(data).then(response => {})
    } else {}
  });
 }

 fetchSettingData(type: string) {
  return new Promise((resolve, reject) => {
    if(type == 'city') {
      this.API.fetchAllCity().then(response => { this.STORE.setCity(response); resolve(response); }, errorMessage => reject(errorMessage) )
    } else if(type == 'device type') {
      this.API.fetchAllDeviceType().then(response => { this.STORE.setDeviceType(response); resolve(response); }, errorMessage => reject(errorMessage) )
    } else if(type == 'role') {
      // this.API.updateCity().then(response => {})
    } else if(type == 'device brand') {
      this.API.fetchAllDeviceBrand().then(response => { this.STORE.setDeviceBrand(response); resolve(response); }, errorMessage => reject(errorMessage) )
    } else if(type == 'device model') {
      this.API.fetchAllDeviceModel().then(response => { this.STORE.setDeviceModel(response); resolve(response); }, errorMessage => reject(errorMessage) )
    } else if(type == 'company') {
      this.API.fetchAllCompany().then(response => { this.STORE.setCompany(response); resolve(response); }, errorMessage => reject(errorMessage) )
    } else {}
  });
 }

 getSettingData(type: string) {
  if(type == 'city') {
    return this.STORE.getCity();
  } else if(type == 'device type') {
    return this.STORE.getDeviceType();
  // } else if(type == 'role') {
    // return this.STORE
  } else if(type == 'device brand') {
    return this.STORE.getAllBrands();
  } else if(type == 'device model') {
    return this.STORE.getAllModels();
  } else if(type == 'company') {
    return this.STORE.getAllCompany();
  } else { return; }
 }

 getDependentFormDescription(type: string) {
  if(type == 'device brand') {
    return this.STORE.getDeviceType().map(s => { return {label: s, value: s}});
  } else if(type == 'device model') {
    return this.STORE.getAllBrands().map(s => { return {label: `${s.brandName} - ${s.deviceType}`, value: s.id}});
  } else if(type == 'company') {
    return [{label: 'staff', value: 'staff'}, {label: 'contractor', value: 'contractor'}]
  } else { return; }
 }

 addDependent(type: string, data: any) {
  return new Promise((resolve, reject) => {
    if(type == 'company') {
      const newData = {employmentType: data.description, title: data.title}
      this.API.addCompany(newData).then(response => {
        this.STORE.addCompany(response);
        resolve(true);
      })
    } else if(type == 'device brand') {
      const newData = {deviceType: data.description, brandName: data.title};
      this.API.addDeviceBrand(newData).then(response => {
        this.STORE.addDeviceBand(response);
        resolve(true);
      })
    } else if(type == 'device model') {
      const newData = {brandId: data.description, model: data.title};
      this.API.addDeviceModel(newData).then(response => {
        this.STORE.addDeviceModel(response);
        resolve(true);
      })
    } else {}
  });
 }

 deleteDependent(type: string, id: string) {
  return new Promise((resolve, reject) => {
    if(type == 'company') {
      this.API.deleteCompany(id).then(response => resolve(true), error => reject(error))
    } else if(type == 'device brand') {
      this.API.deleteDeviceBrand(id).then(response => resolve(true), error => reject(error))
    } else if(type == 'device model') {
      this.API.deleteDeviceModel(id).then(response => resolve(true), error => reject(error))
    } else {}
  });
 }
}