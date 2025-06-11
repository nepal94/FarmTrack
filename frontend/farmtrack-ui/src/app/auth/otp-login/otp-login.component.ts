import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppHeadingComponent } from '../../shared/heading/heading.component';
import { AppInputComponent } from '../../shared/input/input.component';
import { AppButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-otp-login',
  standalone: true,
  imports: [ReactiveFormsModule, AppHeadingComponent, AppInputComponent, AppButtonComponent],
  templateUrl: './otp-login.component.html'
})
export class OtpLoginComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      otp: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  sendOtp() {}
  verifyOtp() {}
}
