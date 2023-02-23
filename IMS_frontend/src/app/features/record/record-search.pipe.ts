import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recordSearch'
})
export class RecordSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args == "") {
      return value;
    }
    const searchKey = args.toLowerCase();

    return value.filter((record: any) => {
      if(record.id == searchKey || record.date.includes(searchKey) || 
      record.accessory.includes(searchKey) || 
      record.description.includes(searchKey) || 
      record.actionBy.includes(searchKey)) {
        return record;
      } else { return; }
    });
  }

}
