import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { MessageService } from 'src/app/shared/services/message.service';
import { SettingService } from '../../../service/setting.service';

interface displayModel {
    primaryKey: string;
    description: string;
    title: string;
}

@Component({
  selector: 'app-dependent-entry',
  templateUrl: './dependent-entry.component.html',
  styleUrls: ['./dependent-entry.component.scss']
})
export class DependentEntryComponent implements OnInit {
  heading: string[] = [];
  titles: displayModel[] = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @Input() type = '';
  // @Input() item = '';
  mainForm!: UntypedFormGroup;
  formSubmitted = false;
  descriptions: any = [];

  sliceHeading(value: string) {
    if(this.type == "device model") {
      return this.descriptions.filter((description: any) => description.value == value).map((s: any) => s.label)[0];
    } else { return value; }
  }

  submitForm(): void {
    this.formSubmitted = true;
    if (this.mainForm.valid) {
      this.settingService.addDependent(this.type, this.mainForm.value).then(() => {
        this.mainForm.reset();
        this.initDisplay();
        this.formSubmitted = false;
      });
    } else {
      Object.values(this.mainForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


  handleClose(removedTagIndex: number, key: string): void {
    this.settingService.deleteDependent(this.type, key).then(() => {
      // todo apply loading effect
      this.messageService.display("success", `${this.titles[removedTagIndex].title} successfully removed from the list`)
      this.titles.splice(removedTagIndex, 1);

    }, errorMessage => {
      this.messageService.display("error", errorMessage);
    })
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    // console.log(this.inputValue);
    // if (this.inputValue && this.titles.indexOf(this.inputValue) === -1) {
    //   this.titles = [...this.titles, this.inputValue.toLowerCase()];
    //   this.settingService.updateIndependent(this.type, this.titles).then(() => {
    //     // todo - apply loading effect
    //   })
    // }
    this.inputValue = '';
    this.inputVisible = false;
  }

  private onlyUnique(data: any) {
    const uniqueValues = data.filter((value: any, index: any, self: any) =>{
      if(this.type == "device brand") {
          return self.map((s: any) => s.deviceType).indexOf(value.deviceType) === index;
      } else if(this.type == "device model") {
          return self.map((s: any) => s.brandId).indexOf(value.brandId) === index;
      } else if(this.type == "company") {
          return self.map((s: any) => s.employmentType).indexOf(value.employmentType) === index;
      } else {
        // console.log("else block");
        return [];
      }
    });

    if(this.type == "device brand") {
      return uniqueValues.map((s: any) => s.deviceType)
    } else if(this.type == "device model") {
      return uniqueValues.map((s: any) => s.brandId)
    } else if(this.type == "company") {
      return uniqueValues.map((s: any) => s.employmentType)
    } else {
      // console.log("else block");
      return [];
    }
  }

  private formatData(data: any): displayModel[] {
    return data.map((value: any) => {
      if(this.type == "device brand") {
        return { primaryKey: value.id, description: value.deviceType, title: value.brandName};
      } else if(this.type == "device model") {
        return { primaryKey: value.id, description: value.brandId, title: value.model};
      } else if(this.type == "company") {
        return { primaryKey: value.id, description: value.employmentType, title: value.title};
      } else {
        return;
      }
    })
  }

  initDisplay() {
    const rawData = this.settingService.getSettingData(this.type);
    this.titles = this.formatData(rawData);
    this.heading = this.onlyUnique(rawData);
  }

  constructor(private fb: UntypedFormBuilder, private settingService: SettingService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      description: [null, [Validators.required]],
      title: [null, [Validators.required]],
    });

    this.initDisplay();

    this.descriptions = this.settingService.getDependentFormDescription(this.type);
  }
}