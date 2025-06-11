import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppHeadingComponent } from '../../shared/heading/heading.component';
import { AppInputComponent } from '../../shared/input/input.component';
import { AppButtonComponent } from '../../shared/button/button.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AppHeadingComponent, AppInputComponent, AppButtonComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const { fullName, mobile, email, password } = this.registerForm.value;
    this.auth.register({ username: fullName, mobile, email, password }).subscribe({
      next: () => alert('Registration successful!'),
      error: err => alert('Registration failed: ' + (err.error?.message || err.message))
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control || !control.touched || control.valid) return '';
    if (control.errors?.['required']) return `${this.labelFor(controlName)} is required.`;
    if (control.errors?.['email']) return 'Invalid email format.';
    if (control.errors?.['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${this.labelFor(controlName)} must be at least ${requiredLength} characters.`;
    }
    if (control.errors?.['pattern']) return `Invalid ${this.labelFor(controlName).toLowerCase()}.`;
    return 'Invalid input.';
  }

  private labelFor(controlName: string): string {
    switch (controlName) {
      case 'fullName': return 'Full Name';
      case 'mobile': return 'Mobile Number';
      case 'password': return 'Password';
      case 'email': return 'Email';
      default: return controlName.charAt(0).toUpperCase() + controlName.slice(1);
    }
  }
}
