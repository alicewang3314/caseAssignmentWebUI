import { Component } from '@angular/core';
import { DatePipe, NgIf, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationService } from '../notification/notification.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CaptorThemeSwitchComponent } from '../../theme';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'captor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    AsyncPipe,
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
  userName$ = this._user.user$.pipe(map(({ userId }) => userId));

  /** Logout user and redirect to unauthorize page **/
  logout() {
    this._user.logout();
  }

  /** Open other sites by URL **/
  navigate(url: string) {
    window.location.href = url;
  }

  /** Open and close notification panel **/
  toggleNotification() {
    this._notificationService.toggleNotification();
  }

  /** Return if the notification is opened from notification service **/
  get isNotificationOpened() {
    return this._notificationService.isOpened;
  }

  /** Get number of notifications from notification service**/
  get notificationCount() {
    return this._notificationService.notifications.length;
  }

  constructor(
    private _notificationService: NotificationService,
    private _user: UserService
  ) {
  }
}
