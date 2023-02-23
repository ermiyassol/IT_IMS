import { Component, Input, OnInit } from '@angular/core';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() heading = "";
  @Input() value: any[] = [];
  @Input() header: any[] = [];

  listOfData: ItemData[] = [];

  formatPoDetail(details: {value: number, device: string}[]) {
    const result = [];
    for (let i = 2; i < this.header.length; i++) {
      const header = this.header[i];
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
        if(detail.device == header) {
          result.push(detail.value);
        }
      }
      if(!result[i-2]) { result.push(0); }
    }
    return result;
  }

  constructor() { }

  ngOnInit(): void {
    if(this.value[0].po) {
      this.value = this.value.map(data => {
        data.poDetails = data.poDetails ? data.poDetails : [];
        const poDetails = this.formatPoDetail(data.poDetails)
        return {
          po: data.po,
          receivedAt: data.receivedAt,
          poDetails: poDetails
        }
      });
    }
  }
}