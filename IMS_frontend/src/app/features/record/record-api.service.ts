import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/services/api.store';

@Injectable({
  providedIn: 'root'
})
export class RecordApiService {

constructor(private http: HttpClient, private api: API) { }

addRecord = (data: any) => {
  return new Promise((resolve, reject) => {
    this.http.post<any>(this.api.addRecord, data).subscribe(response => {
      if(response) {
        resolve(response);
      } else {
        reject("Failed to add record!! Please try again.")
      }
    });
  });
};

updateRecord = (data: any, id: string) => {
  return new Promise((resolve, reject) => {
    this.http.put<{status: number, recordId: String, updatedValues: any}>(this.api.updateRecord + id, data).subscribe(response => {
      if(response.status = 1) {
        resolve(response);
      } else {
        reject("Wrong record ID!! Please try again.")
      }
    });
  });
};

fetchAllRecord = () => {
  return new Promise((resolve, reject) => {
    this.http.get<any[]>(this.api.fetchAllRecord).subscribe(response => {
      resolve(response);
    });
  });
};

deleteRecord = (id: string) => {
  return new Promise((resolve, reject) => {
    this.http.delete<any>(this.api.deleteRecord + id).subscribe(response => {
      if(response.status) {
        resolve(response.recordId);
      } else {
        reject("There is no record found!! Please try again.")
      }
    });
  });
};
}