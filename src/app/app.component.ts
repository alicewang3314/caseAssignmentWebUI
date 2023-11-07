import { Component } from '@angular/core';
import { CaptorThemeService } from 'src/app/commonUI/theme/captor-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'caseAssignment';

  constructor(private _theme: CaptorThemeService) {
    this._theme.loadTheme();
  }
}
