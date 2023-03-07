import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/store/store.service';
import { RecordApiService } from './record-api.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

constructor(private recordApi: RecordApiService, private STORE: StoreService) { }

addRecord = (data: any) => {
  return new Promise((resolve, reject) => {
    const actionBy = this.STORE.getUsername();
    data.date = new Date(data.date).toDateString();
    const newRecord = {date: data.date, description: data.description, accessory: data.accessory ? data.accessory : "", type: data.type ? data.type : "", actionBy: actionBy}; // should be integrated with the authentication
    this.recordApi.addRecord(newRecord).then(response => {
      this.STORE.addRecord(response);
      resolve(true);
    }, error => reject(error));
  });
};

getUsername() { return this.STORE.getUsername(); }

// updateRecord = (data: any, id: string) => {
//   return new Promise((resolve, reject) => {
    
//   });
// };

getRecords() { return this.STORE.getAllRecord(); }

fetchAllRecord = () => {
  return new Promise((resolve, reject) => {
    this.recordApi.fetchAllRecord().then((response: any) => {
      this.STORE.setRecord(response);
      // console.log("Recordes - ", response)
      resolve(response);
    }, error => reject(error));
  });
};

deleteRecord = (id: string) => {
  return new Promise((resolve, reject) => {
    this.recordApi.deleteRecord(id).then(response => {
      this.STORE.deleteRecord(id);
      resolve(true);
    }, error => reject(error));
  });
};

getAccessories() {
  return this.STORE.getAllAccessory();
}
}
