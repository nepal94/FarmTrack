import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppHeadingComponent } from '../../shared/heading/heading.component';
import { AppButtonComponent } from '../../shared/button/button.component';
import { AppInputComponent } from '../../shared/input/input.component';
import { Router, RouterModule } from '@angular/router'; // <-- Import Router here
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppHeadingComponent,
    AppButtonComponent,
    AppInputComponent,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    const { mobile, password } = this.loginForm.value;
    this.auth.login({ mobile, password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        // Save JWT token, redirect, etc.
        alert('Login successful!');
      },
      error: err => {
        this.isLoading = false;
        alert('Login failed: ' + (err.error?.message || err.message));
      }
    });
  }

  onOtpLogin() {
    console.log('OTP login flow triggered');
    // Navigate or call OTP service
  }

  onFingerprintLogin() {
    console.log('Fingerprint login flow triggered');
    // Use platform/hybrid native API
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
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
      case 'mobile': return 'Mobile Number';
      case 'password': return 'Password';
      case 'email': return 'Email';
      default: return controlName.charAt(0).toUpperCase() + controlName.slice(1);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
