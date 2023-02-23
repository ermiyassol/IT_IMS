import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/services/api.store';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

constructor(private http: HttpClient, private api: API) { }

fetchGeneralStat = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.fetchGeneralStat).subscribe(response => {
      resolve(response);
    }, error => reject(error));
  });
};

fetchSpecificStat = (deviceType: string) => {
  return new Promise((resolve, reject) => {
    this.http.post(this.api.fetchSpecificStat, {deviceType: deviceType}).subscribe(response => {
      resolve(response);
    }, error => reject(error));
  });
};

fetchSpecificModelStat = (brandId: string) => {
  return new Promise((resolve, reject) => {
    this.http.post(this.api.fetchSpecificModelStat, {brandId: brandId}).subscribe(response => {
      resolve(response);
    }, error => reject(error));
  });
};

fetchTotalDeviceStat = () => {
  return new Promise((resolve, reject) => {
    this.http.get(this.api.totalDeviceStat).subscribe(response => {
      resolve(response);
    }, error => reject(error));
  });
};
}