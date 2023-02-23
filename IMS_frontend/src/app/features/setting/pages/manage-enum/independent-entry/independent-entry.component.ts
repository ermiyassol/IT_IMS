import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { SettingService } from '../../../service/setting.service';

@Component({
  selector: 'app-independent-entry',
  templateUrl: './independent-entry.component.html',
  styleUrls: ['./independent-entry.component.scss']
})
export class IndependentEntryComponent implements OnInit {
  titles: any = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @Input() type = '';
  // @Input() item = '';



  handleClose(removedTagIndex: number): void {
    // this.titles = this.titles.filter(tag => tag !== removedTag);
    this.titles.splice(removedTagIndex, 1);
    this.settingService.updateIndependent(this.type, this.titles).then(() => {
      // todo - apply loading effect
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
    if (this.inputValue && this.titles.indexOf(this.inputValue) === -1) {
      this.titles = [...this.titles, this.inputValue.toLowerCase()];
      this.settingService.updateIndependent(this.type, this.titles).then(() => {
        // todo - apply loading effect
      })
    }
    this.inputValue = '';
    this.inputVisible = false;
  }



  testMethod() {
    // console.log("from test method", this.type);
  }

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.testMethod();
    // console.log("type -> ", this.type);
    // this.settingService.fetchSettingData(this.type).then((response: any) => {
      this.titles = this.settingService.getSettingData(this.type);
    // })

  }
}