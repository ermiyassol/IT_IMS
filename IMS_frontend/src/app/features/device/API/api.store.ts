import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class API {
    private DOMAIN = "http://localhost:8000/api" 
    private DEVICE = "/device"
    private EMPLOYEE = "/employee"
    private HISTORY = "/history"

    // DEVICE
    countDevice = `${this.DOMAIN}${this.DEVICE}/countDevice`;
    addDevice = `${this.DOMAIN}${this.DEVICE}/addDevice`;
    fetchAllDevice = `${this.DOMAIN}${this.DEVICE}/fetchAllDevice`;
    findDevice = `${this.DOMAIN}${this.DEVICE}/findDevice/`;
    updateDevice = `${this.DOMAIN}${this.DEVICE}/updateDevice/`;
    deleteDevice = `${this.DOMAIN}${this.DEVICE}/deleteDevice/`;
    
    //EMPLOYEE
    countEmployee = `${this.DOMAIN}${this.EMPLOYEE}/countEmployee`;
    addEmployee = `${this.DOMAIN}${this.EMPLOYEE}/addEmployee`;
    fetchAllEmployee = `${this.DOMAIN}${this.EMPLOYEE}/fetchAllEmployee`;
    findEmployee = `${this.DOMAIN}${this.EMPLOYEE}/findEmployee/`;
    updateEmployee = `${this.DOMAIN}${this.EMPLOYEE}/updateEmployee/`;
    deleteEmployee = `${this.DOMAIN}${this.EMPLOYEE}/deleteEmployee/`;
    
    // HISTORY
    countHistory = `${this.DOMAIN}${this.HISTORY}/countHistory`;
    addHistory = `${this.DOMAIN}${this.HISTORY}/addHistory`;
    fetchAllHistory = `${this.DOMAIN}${this.HISTORY}/fetchAllHistory`;
    findHistory = `${this.DOMAIN}${this.HISTORY}/findHistory/`;
    updateHistory = `${this.DOMAIN}${this.HISTORY}/updateHistory/`;
    deleteHistory = `${this.DOMAIN}${this.HISTORY}/deleteHistory/`;
}