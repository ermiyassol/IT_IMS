import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { Account } from '../../model/account.model';
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  mainForm!: UntypedFormGroup;
  formSubmitted = false;
  accounts: Account[] = [];
  modalIsVisible = false;
  updateId = "";
  updatedAccount: any = null;

  displayModal(id: string) { 
    this.updateId = id; 
    this.modalIsVisible = true; 
    const index = this.accounts.findIndex(account => account.id == id);
    this.updatedAccount = this.accounts[index];
  }

  addRole() {
    // console.log();
    const index = this.accounts.findIndex(account => account.id == this.updateId);
    this.settingService.updateAccount(this.updatedAccount).then(() => {
      this.accounts = this.settingService.fetchFromStore();
      this.message.display("success", `'${this.updatedAccount.userName}' roles updated successfully`)
      this.modalIsVisible = false;
      this.updateId = "";
      // this.updatedAccount = null;
    })
  }

  submitForm(): void {
    this.formSubmitted = true;
    if (this.mainForm.valid) {
      // console.log("Submit", this.mainForm.value);
      const role = this.mainForm.value.role.join(" | ");
      const userName = this.mainForm.value.userName;
      this.settingService.addAccount({userName: userName, role: role}).then(response => {
        this.message.display("success", "New user added successfully")
        this.formSubmitted = false;
        this.mainForm.reset();
        this.accounts = this.settingService.fetchFromStore();
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

  removeRole(id: string, roleIndex: number) {
    const index = this.accounts.findIndex(account => account.id == id);
    this.accounts[index].role.splice(roleIndex, 1);
    // console.log(this.accounts[index]);
    this.settingService.updateAccount(this.accounts[index]).then(() => {
      this.message.display("success", `'${this.accounts[index].userName}' roles updated successfully`)
      this.accounts = this.settingService.fetchFromStore();
      
    })
  }

  deleteAccount(id: string) {
    // console.log("deleted Id - ", id);
    this.settingService.deleteAccount(id).then(response => {
      this.accounts = this.settingService.fetchFromStore();
      this.message.display("success", "User deleted Successfully")
    }, errorMessage => this.message.display("error", errorMessage))
  }

  constructor(private fb: UntypedFormBuilder, private settingService: SettingService, private message: MessageService) { }

  ngOnInit() {
    this.mainForm = this.fb.group({
      userName: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });

    this.settingService.fetchAccounts().then((response: any) => {
      this.accounts = response;
    })
  }
}
