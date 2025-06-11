import { Component } from '@angular/core';
import { AppHeadingComponent } from '../../shared/heading/heading.component';
import { AppButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-fingerprint-login',
  standalone: true,
  imports: [AppHeadingComponent, AppButtonComponent],
  templateUrl: './fingerprint-login.component.html'
})
export class FingerprintLoginComponent {
  onAuthenticate() {
    // Trigger native biometric call
  }
}
