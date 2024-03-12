import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'unauthorized',
  template: '',
  styleUrls: [],
  standalone: true
})
export class UnauthorizedComponent {
  unauthorizedUrl = `${env.baseUrl}CAPTORUI/#!/captor/unauthorized`;

  constructor() {
    window.location.href = this.unauthorizedUrl;
  }
}
