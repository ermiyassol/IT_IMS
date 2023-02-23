import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceService } from '../../service/device.service';

interface model {
  label: string;
  value: string;
  checked: boolean;
  type: string;
  new: number;
  return: number;
}
@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent implements OnInit {
  @Input() data: string[] = [];
  @Input() showCheckbox: boolean = true;
  accessory: any[] = [];
  allChecked = false;
  indeterminate = true;
  checkOptionsOne: model[] = [];
  radioValue = '';
  selectedAccessoryIndex = -1;
  showAccessory = true;
  @Output() accessoryEvent = new EventEmitter<any>();

  AccessorySelected(value: any, index: number): void {
    this.checkOptionsOne[index].checked = value;
    if(value) {
      this.selectedAccessoryIndex = index;
      this.showAccessory = false;
    } else {
      this.checkOptionsOne[index].type = "";
      this.selectedAccessoryIndex = -1;
      // console.log("Send Data - ", this.checkOptionsOne); //todo emitter required
      this.accessoryEvent.emit(this.checkOptionsOne);
    }
  }

  accessoryStatusSelected() {
    this.checkOptionsOne[this.selectedAccessoryIndex].type = this.radioValue;
    // console.log("Send Data - ", this.checkOptionsOne); //todo emitter required
    this.accessoryEvent.emit(this.checkOptionsOne);

    this.showAccessory = true;
    this.selectedAccessoryIndex = -1;
    this.radioValue = "";
  }

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getAccessory().forEach(item => {
      this.checkOptionsOne.push({ label: item.name, value: item.name, checked: this.data.includes(item.name) ? true : false, type: "", new: item.new, return: item.return })
    });
  }
}
