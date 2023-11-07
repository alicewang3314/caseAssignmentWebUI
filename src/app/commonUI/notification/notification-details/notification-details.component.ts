import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'captor-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
  ]
})
export class NotificationDetailsComponent {
  @Input() header: string = 'sample header';
  @Input() content: string = 'place holder';
  @Input() createdDate: Date = new Date(7, 7, 2023);
  @Input() expiryDate: Date = new Date();
}
