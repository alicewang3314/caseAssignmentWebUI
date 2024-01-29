import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../notification/notification.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'captor-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule]
})
export class FooterComponent {

  get isNotificationOpened() {
    return this._notification.isOpened;
  }

  constructor(private _notification: NotificationService) {
  }
}
