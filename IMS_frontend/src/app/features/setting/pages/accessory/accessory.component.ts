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
    this.settingService.updateAccessory(data).then(() => {
      this.accessories = this.settingService.getAccessory();
    })
  }

  submitForm(): void {
    this.formSubmitted = true;
    if (this.mainForm.valid) {
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