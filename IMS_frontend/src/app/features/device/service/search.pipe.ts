import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args == "") {
      return value;
    }
    const searchKey = args.toLowerCase();

    return value.filter((device: any) => {
      if(device.brand.includes(searchKey) || 
      device.serialNumber.includes(searchKey) || 
      device.assetTagNumber.includes(searchKey) || 
      device.model.includes(searchKey) || 
      device.status.includes(searchKey) || 
      device.fullName.includes(searchKey) || 
      device.role.includes(searchKey) || 
      device.empStatus.includes(searchKey) || 
      device.company.includes(searchKey) || 
      device.city.includes(searchKey)) {
        return device;
      } else { return; }
    });
  }
}
