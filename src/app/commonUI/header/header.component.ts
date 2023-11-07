import { Component } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CaptorThemeSwitchComponent } from '../theme';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'captor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CaptorThemeSwitchComponent
  ]
})
export class HeaderComponent {
  DOCNET_URL = `https://home.cor.pa.gov/intranet/SitePages/Home.aspx`;
  DOC_INFO_URL = `https://dev.web.cor.state.pa.us/DOCInfo/Login.aspx`;
  MFA_USER_PROFILE_URL = `https://dev.captor.cor.state.pa.us/CAPTORUI/#!/captor/mfa`;
  dateTime = new Date();

  logout() {
    // TODO: Logic for auth and user logout
    this._router.navigate(['/login']);
  }

  navigate(url: string) {
    window.location.href = url;
  }

  toggleNotification() {
    this._notificationService.toggleNotification();
  }

  get isNotificationOpened() {
    return this._notificationService.isOpened;
  }

  get notificationCount() {
    return this._notificationService.notificationCount;
  }

  constructor(private _router: Router, private _notificationService: NotificationService) {
    // TODO: Get number of the notification
  }
}
