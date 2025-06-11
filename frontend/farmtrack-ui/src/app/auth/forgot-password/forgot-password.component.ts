import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppHeadingComponent } from '../../shared/heading/heading.component';
import { AppInputComponent } from '../../shared/input/input.component';
import { AppButtonComponent } from '../../shared/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, AppHeadingComponent, AppInputComponent, AppButtonComponent, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }
  onSubmit() {
    // Handle OTP send logic
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.touched || control.valid) return '';
    if (control.errors?.['required']) return 'Mobile Number is required.';
    if (control.errors?.['pattern']) return 'Invalid mobile number.';
    return 'Invalid input.';
  }
}
