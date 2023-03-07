import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { RecordService } from './record.service';
import { differenceInCalendarDays, setHours } from 'date-fns';

import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  mainForm!: UntypedFormGroup;
  formSubmitted = false;
  records: any[] = [];
  accessories: any[] = [];
  searchKey: string = "";
  username: string = "";
  timeDefaultValue = setHours(new Date(), 0);

  // displayModal(id: string) { 
  //   this.updateId = id; 
  //   this.modalIsVisible = true; 
  //   const index = this.records.findIndex(account => account.id == id);
  //   this.updatedAccount = this.records[index];
  // }

  // addRole() {
    // console.log();
  //   const index = this.records.findIndex(account => account.id == this.updateId);
  //   this.recordService.updateAccount(this.updatedAccount).then(() => {
  //     this.records = this.recordService.fetchFromStore();
  //     this.message.display("success", `'${this.updatedAccount.userName}' roles updated successfully`)
  //     this.modalIsVisible = false;
  //     this.updateId = "";
  //     // this.updatedAccount = null;
  //   })
  // }

  disabledDate = (current: Date): boolean =>
  // Can not select days before today and today
  differenceInCalendarDays(current, new Date()) > 0;

  submitForm(): void {
    this.formSubmitted = true;
    // console.log(this.mainForm);
    const validation = this.mainForm.valid || this.mainForm.value.date && this.mainForm.value.description && !this.mainForm.value.accessory && !this.mainForm.value.type;
    if (validation) {
      // console.log("Submit", this.mainForm.value);
      this.recordService.addRecord(this.mainForm.value).then(response => {
        this.message.display("success", "New record added successfully")
        this.formSubmitted = false;
        this.mainForm.reset();
        this.mainForm.patchValue({date: new Date().toDateString()})
        this.records = this.recordService.getRecords();
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

  deleteRecord(id: string) {
    this.recordService.deleteRecord(id).then((response: any) => {
      this.records = this.recordService.getRecords();
      this.message.display("success", "User deleted Successfully")
    }, errorMessage => this.message.display("error", errorMessage))
  }

  returnAccessoryValue(returnType: string) {
    const index = this.accessories.findIndex(accessory => accessory.name == this.mainForm.value.accessory);
    if(index < 0) { return false; }

    if(returnType == "new" && this.accessories[index].new > 0) {
      return true;
    } else if(returnType == "return" && this.accessories[index].return > 0) {
      return true;
    } else { return false; }
  }

  constructor(private fb: UntypedFormBuilder, private recordService: RecordService, private message: MessageService) { }

  ngOnInit() {
    this.mainForm = this.fb.group({
      date: [new Date().toDateString(), [Validators.required]],
      accessory: [null],
      type: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.recordService.fetchAllRecord().then((response: any) => {
      this.records = response;
    })

    this.accessories = this.recordService.getAccessories();
    this.records = this.recordService.getRecords();

    this.username = this.recordService.getUsername();
  }
}