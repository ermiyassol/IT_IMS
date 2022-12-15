import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args?: string[]): string {
    let arrVal: string[] = [];

    value.split(" ").forEach(val => {
      const capVal = val.toLowerCase().charAt(0).toUpperCase() + val.toLowerCase().slice(1);
      arrVal.push(capVal);
    });
    return arrVal.join(" ");
  }
}
