import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  isLoading = false;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.authService.login(this.validateForm.value).then(() => {
        // todo turn when success
        this.validateForm.reset();
        this.routes.navigate(['main'])
        this.isLoading = false;
      }, errorMessage => {
        this.messageService.display("error", errorMessage);
        this.isLoading = false;
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private routes: Router, private messageService: MessageService, private fb: UntypedFormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true]
    });
  }
}