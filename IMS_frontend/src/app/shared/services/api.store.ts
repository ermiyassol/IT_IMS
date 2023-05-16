import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class API {
    // private DOMAIN = "http://10.3.74.173:8000/api"
    private DOMAIN = "http://dptest0001:8000/api"
    private DEVICE = "/device"
    private EMPLOYEE = "/employee"
    private HISTORY = "/history"
    private AUTH = "/auth"
    private COMPANY = "/company"
    private CITY = "/city"
    private ACCOUNT = "/account"
    private PURCHASE = "/purchase"
    private DASHBOARD = "/dashboard"
    private ACCESSORY = "/accessory"
    private RECORD = "/record"

    // RECORD
    fetchAllRecord = `${this.DOMAIN}${this.RECORD}/fetchAllRecord`;
    addRecord = `${this.DOMAIN}${this.RECORD}/addRecord`;
    deleteRecord = `${this.DOMAIN}${this.RECORD}/deleteRecord/`;
    updateRecord = `${this.DOMAIN}${this.RECORD}/updateRecord/`;

    // ACCESSORY
    fetchAllAccessory = `${this.DOMAIN}${this.ACCESSORY}/fetchAllAccessory`;
    addAccessory = `${this.DOMAIN}${this.ACCESSORY}/addAccessory`;
    deleteAccessory = `${this.DOMAIN}${this.ACCESSORY}/deleteAccessory/`;
    updateAccessory = `${this.DOMAIN}${this.ACCESSORY}/updateAccessory/`;

    // DASHBOARD
    fetchGeneralStat = `${this.DOMAIN}${this.DASHBOARD}/fetchGeneralStat`;
    fetchSpecificStat = `${this.DOMAIN}${this.DASHBOARD}/fetchSpecificStat`;
    fetchSpecificModelStat = `${this.DOMAIN}${this.DASHBOARD}/fetchSpecificModelStat`;
    totalDeviceStat = `${this.DOMAIN}${this.DASHBOARD}/totalDeviceStat`;

    // PURCHASE
    addPurchase = `${this.DOMAIN}${this.PURCHASE}/addPurchase`;
    fetchAllPurchase = `${this.DOMAIN}${this.PURCHASE}/fetchAllPurchase`;
    deletePurchase = `${this.DOMAIN}${this.PURCHASE}/deletePurchase/`;

    // ACCOUNT
    countAccount = `${this.DOMAIN}${this.ACCOUNT}/countAccount`;
    addAccount = `${this.DOMAIN}${this.ACCOUNT}/addAccount`;
    fetchAllAccount = `${this.DOMAIN}${this.ACCOUNT}/fetchAllAccount`;
    findAccount = `${this.DOMAIN}${this.ACCOUNT}/findAccount/`;
    updateAccount = `${this.DOMAIN}${this.ACCOUNT}/updateAccount/`;
    deleteAccount = `${this.DOMAIN}${this.ACCOUNT}/deleteAccount/`;

    // AUTH
    login = `${this.DOMAIN}${this.AUTH}/login`;

    // CITY
    updateCity = `${this.DOMAIN}${this.CITY}/updateCity`;
    fetchAllCity = `${this.DOMAIN}${this.CITY}/fetchAllCity`;

    // COMPANY
    addCompany = `${this.DOMAIN}${this.COMPANY}/addCompany`;
    fetchAllCompany = `${this.DOMAIN}${this.COMPANY}/fetchAllCompany`;
    deleteCompany = `${this.DOMAIN}${this.COMPANY}/deleteCompany/`;

    // DEVICE
    bulkAddDevice = `${this.DOMAIN}${this.DEVICE}/bulkAddDevice`;
    downloadBulkTemplate = `${this.DOMAIN}${this.DEVICE}/downloadBulkTemplate`;
    countDevice = `${this.DOMAIN}${this.DEVICE}/countDevice`;
    addDevice = `${this.DOMAIN}${this.DEVICE}/addDevice`;
    fetchAllDevice = `${this.DOMAIN}${this.DEVICE}/fetchAllDevice`;
    findDevice = `${this.DOMAIN}${this.DEVICE}/findDevice/`;
    updateDevice = `${this.DOMAIN}${this.DEVICE}/updateDevice/`;
    deleteDevice = `${this.DOMAIN}${this.DEVICE}/deleteDevice/`;
    generateLiabilityForm = `${this.DOMAIN}${this.DEVICE}/generateLiabilityForm/`;
    downloadLiabilityDoc = `${this.DOMAIN}${this.DEVICE}/downloadLiabilityDoc/`;

    // ----------CITY----------------------------------------------------------------
    updateDeviceType = `${this.DOMAIN}${this.DEVICE}/updateDeviceType`;
    fetchAllDeviceType = `${this.DOMAIN}${this.DEVICE}/fetchAllDeviceType`;
    // ---------BRAND-----------------------------------------------------------------
    addDeviceBrand = `${this.DOMAIN}${this.DEVICE}/addDeviceBrand`;
    fetchAllDeviceBrand = `${this.DOMAIN}${this.DEVICE}/fetchAllDeviceBrand`;
    deleteDeviceBrand = `${this.DOMAIN}${this.DEVICE}/deleteDeviceBrand/`;
    // ---------MODEL-----------------------------------------------------------------
    addDeviceModel = `${this.DOMAIN}${this.DEVICE}/addDeviceModel`;
    fetchAllDeviceModel = `${this.DOMAIN}${this.DEVICE}/fetchAllDeviceModel`;
    deleteDeviceModel = `${this.DOMAIN}${this.DEVICE}/deleteDeviceModel/`;

    //EMPLOYEE
    countEmployee = `${this.DOMAIN}${this.EMPLOYEE}/countEmployee`;
    addEmployee = `${this.DOMAIN}${this.EMPLOYEE}/addEmployee`;
    fetchAllEmployee = `${this.DOMAIN}${this.EMPLOYEE}/fetchAllEmployee`;
    findEmployee = `${this.DOMAIN}${this.EMPLOYEE}/findEmployee/`;
    updateEmployee = `${this.DOMAIN}${this.EMPLOYEE}/updateEmployee/`;
    deleteEmployee = `${this.DOMAIN}${this.EMPLOYEE}/deleteEmployee/`;
    uploadLiabilityForm = `${this.DOMAIN}${this.EMPLOYEE}/uploadLiabilityForm`;
    downloadSignedLiabilityDoc = `${this.DOMAIN}${this.EMPLOYEE}/downloadLiabilityDoc/`;
    // HISTORY
    countHistory = `${this.DOMAIN}${this.HISTORY}/countHistory`;
    addHistory = `${this.DOMAIN}${this.HISTORY}/addHistory`;
    fetchAllHistory = `${this.DOMAIN}${this.HISTORY}/fetchAllHistory`;
    findHistory = `${this.DOMAIN}${this.HISTORY}/findHistory/`;
    updateHistory = `${this.DOMAIN}${this.HISTORY}/updateHistory/`;
    deleteHistory = `${this.DOMAIN}${this.HISTORY}/deleteHistory/`;
}
