import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/store/store.service';
import { AuthAPIService } from '../API/auth.API.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private authAPI: AuthAPIService, private STORE: StoreService) { }

login = (formData: any) => {
  return new Promise((resolve, reject) => {
    this.authAPI.login(formData).then((response: any) => {
      this.STORE.setSession(response);
      resolve(true);
    }, errorMessage => reject(errorMessage));
  })
}

logout = () => {
  return new Promise((resolve, reject) => {
    this.STORE.deleteSession();
    resolve(true);
  })
}

}