import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import * as XLSX from 'xlsx';
import { DeviceService } from '../../../service/device.service';

@Component({
  selector: 'app-bulk-form',
  templateUrl: './bulk-form.component.html',
  styleUrls: ['./bulk-form.component.scss']
})
export class BulkFormComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  target: DataTransfer | null = null;
  fileValidated = false;
  isLoading = false;
  listOfError: any[] = [];

  submitForm(): void {
    this.listOfError = [];
    if(this.target) {
      this.isLoading = true;
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(this.target.files[0]);
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  
        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        /* save data */
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        console.log(data); // Data will be logged in array format containing objects
        this.deviceService.deviceBulkUpload(data).then((response: any) => {
          this.isLoading = false;
          this.message.display("success", response);
          this.routes.navigate(['../view'], {relativeTo: this.route})

        }, error => {
          this.isLoading = false;
          this.message.display("error", error.message);
          this.listOfError = error.data;
          // console.log("error", this.listOfError);
        })
      };
    }
  }

  onFileChange(event: any) {
    /* wire up file reader */
    this.listOfError = [];
    this.target = <DataTransfer>(event.target);
    this.fileValidated = true;

    if(this.target.files.length !== 1) {
      this.message.display("error", "Cannot Use Multiple files. Please Upload Only Single File.!");
      this.target = null;
      this.fileValidated = false;
      throw new Error('Cannot use multiple files');
    }

    if(this.target.files[0].type != "text/csv") {
      this.message.display("error", "Unsupported File Type, Only .CSV File is Supported!");
      this.target = null;
      this.fileValidated = false;
      throw new Error('Unsupported file type!');
    }
 }

 downloadBulkTemplate() {
  this.deviceService.downloadBulkTemplate().then(() => this.message.display("success", "File downloaded successfully"), errorMessage => this.message.display("error", errorMessage));
 }

  constructor(private fb: UntypedFormBuilder, private deviceService: DeviceService, private message: MessageService, private routes: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      file: ["", [Validators.required]],
    });
  }
}