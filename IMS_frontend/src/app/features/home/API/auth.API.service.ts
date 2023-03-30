import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/services/api.store';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

constructor(private api: API, private http: HttpClient) { }

login = (data: any) => {
  return new Promise((resolve, reject) => {
    console.log("Auth api called");
    this.http.post<{status: number, data: any}>(this.api.login, data).subscribe(response => {
      resolve(response.data);
      console.log("Token - ", response.data);
    }, error => {
      reject(error.error.message);
    });
  });
};
}
