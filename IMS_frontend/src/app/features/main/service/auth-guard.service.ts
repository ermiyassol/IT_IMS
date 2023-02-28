import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/shared/store/store.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private STORE: StoreService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log("route - ", route);
    const roles = this.STORE.getRoles();
    
    // if(roles.includes("human resource") || roles.includes("finance") || roles.includes("user")) { return false; }
    // if(state.url == "/main/record") { return true; }
    if(roles.includes("inventory manager") && (state.url.includes("main/device") || (state.url.includes("manage_enum_data") || state.url.includes("manage_accessory")))) { return true; }
    
    if(state.url.includes("main/device") && roles.includes("it support")) { return true; }
    if(roles.includes("admin") || state.url.includes("dashboard") || state.url == "/main/record" || state.url.includes("main/device/view")) { return true; }
    if(state.url.includes("view") && roles.includes("back office manager")) { return true; }
    // if((state.url == "/main/device/add" || (state.url.includes("device/view") && state.url.includes("detail"))) && roles.includes("back office manager")) { return false; }


    return false;
   }
}