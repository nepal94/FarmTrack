import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {
  reason: string = '';
  title: string = '';
  message: string = '';
  image: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.reason = params['reason'] || 'unknown';
      this.setErrorContent();
    });
  }

  setErrorContent() {
    switch (this.reason) {
      case 'unauthorized':
        this.title = 'Unauthorized';
        this.message = 'You must be logged in to access this page.';
        this.image = 'assets/fevico.png';
        break;
      case 'server':
        this.title = 'Server Error';
        this.message = 'Something went wrong on our end. Please try again later.';
        this.image = 'assets/logo-alt.png';
        break;
      default:
        this.title = 'Error';
        this.message = 'An unexpected error occurred.';
        this.image = 'assets/logo.png';
    }
  }
}
