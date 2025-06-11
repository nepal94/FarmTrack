import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class AppButtonComponent {
  @Input() label: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() disabled = false;

  // Debug: Log label on init to verify input binding
  ngOnInit() {
    console.log('AppButtonComponent label:', this.label);
  }
}