import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DeviceStoreService } from '../../../store/device-store.service';

@Component({
  selector: 'app-bulk-form',
  templateUrl: './bulk-form.component.html',
  styleUrls: ['./bulk-form.component.scss']
})
export class BulkFormComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  brands: string[] = [];
  models: string[] = [];
  status: string[] = [];

  brandChanged() {
    this.models = this.deviceStoreService.getModels(this.validateForm.value.brand);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder, private deviceStoreService: DeviceStoreService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      brand: ["", [Validators.required]],
      serialNumber: ["", [Validators.required]],
      assetTag: ["", [Validators.required]],
      model: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });

    this.brands = this.deviceStoreService.getBrands();
    this.status = this.deviceStoreService.getStatus();
  }
}