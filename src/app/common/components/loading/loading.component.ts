import { Component } from '@angular/core';

@Component({
  selector: 'captor-loading',
  template: `
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: []
})
export class LoadingComponent {
}
