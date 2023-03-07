import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { Account } from '../../model/account.model';
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent implements OnInit {
  mainForm!: UntypedFormGroup;
  formSubmitted = false;
  accounts: Account[] = [];
  modalIsVisible = false;
  updateId = "";
  updatedAccount: any = null;
  accessories: any[] = [];

  updateContent(data: any) {
    const index = this.accessories.findIndex(acc => acc.id == data.id);
    if(data.return < 0 ) {data.return = 0; this.accessories[index] = data; this.message.display("error", "quantity less than 0 is not acceptable!"); }
    else if(data.new < 0 ) {data.new = 0; this.accessories[index] = data; this.message.display("error", "quantity less than 0 is not acceptable!"); }
    else {
      this.settingService.updateAccessory(data).then(() => {
        this.accessories = this.settingService.getAccessory();
      })
    }
  }

  formValidator() {
    if(this.mainForm.value.quantity < 0) { 
      this.mainForm.patchValue({quantity: 0});
      this.message.display("error", "quantity less than 0 is not acceptable!");
      return false; 
    }
    const index = this.accessories.findIndex(acc => acc.name == this.mainForm.value.name);
    if(index >= 0) { 
      this.mainForm.patchValue({name: ""});
      this.message.display("error", "'" + this.accessories[index].name + "' is already exist!");
      return false;
     }
    return true;
  }

  submitForm(): void {
    this.formSubmitted = true;
    if (this.mainForm.valid && this.formValidator()) {
      this.settingService.addAccessory(this.mainForm.value).then(response => {
        this.message.display("success", "New accessory added successfully")
        this.formSubmitted = false;
        this.mainForm.reset();
        this.accessories = this.settingService.getAccessory();
      })
    } else {
      Object.values(this.mainForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  deleteAccessory(id: string) {
    // console.log("deleted Id - ", id);
    this.settingService.deleteAccessory(id).then(response => {
      this.accessories = this.settingService.getAccessory();
      this.message.display("success", "Accessory deleted Successfully")
    }, errorMessage => this.message.display("error", errorMessage))
  }

  constructor(private fb: UntypedFormBuilder, private settingService: SettingService, private message: MessageService) { }

  ngOnInit() {
    this.mainForm = this.fb.group({
      name: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
    });

    this.accessories = this.settingService.getAccessory();;
  }
}