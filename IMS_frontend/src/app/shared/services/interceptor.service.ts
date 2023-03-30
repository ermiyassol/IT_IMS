import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  catchError, Observable, throwError } from 'rxjs';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private STORE: StoreService, private routes: Router) {} 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
   
   
   if(!request.url.includes("api/auth/login")) {
    const token = this.STORE.getAuthToken();
    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
         setHeaders: {Authorization: `${token}`}
      });
   }
  }

  return next.handle(request).pipe(
  	catchError((err: any) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) {
       	 this.routes.navigate(['auth'])
         console.log("Token Not Found!!");
     	}
 	 }
  	return throwError(err);
	})
   )
  }
}