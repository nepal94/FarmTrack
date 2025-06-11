import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  standalone: true,
})
export class AppHeadingComponent {
  @Input() level: 'h1' | 'h2' | 'h3' | 'h4' = 'h2';
  @Input() text = '';
  @Input() className = '';
}
