import { Component, OnInit } from '@angular/core';
import { CaptorThemeService } from '../captor-theme.service';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'captor-theme-switch',
  templateUrl: './captor-theme-switch.component.html',
  styleUrls: [],
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class CaptorThemeSwitchComponent implements OnInit {
  private _theme = 'light';

  toggle() {
    this._theme = this._theme === 'light' ? 'dark' : 'light';
    this._themeService.updateTheme(this._theme);
  }

  get theme() {
    return this._theme;
  }

  constructor(private _themeService: CaptorThemeService) {
    this._theme = this._themeService.appTheme;
  }

  ngOnInit(): void {
  }
}
