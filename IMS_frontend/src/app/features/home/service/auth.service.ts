import { Injectable } from '@angular/core';
import { AuthAPIService } from '../API/auth.API.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private authAPI: AuthAPIService) { }

login = (formData: any) => {
  return new Promise((resolve, reject) => {
    this.authAPI.login(formData).then(response => {
      // todo when the login success
      resolve(true);
    }, errorMessage => reject(errorMessage));
  })
}

}
