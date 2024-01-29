import { Component } from '@angular/core';
import { CaptorThemeService } from 'src/app/common/theme/captor-theme.service';
import { NotificationService } from 'src/app/common/components/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'caseAssignment';
  isNotificationOpened = false;

  constructor(private _theme: CaptorThemeService, public notification: NotificationService) {
    this._theme.loadTheme();
  }
}
