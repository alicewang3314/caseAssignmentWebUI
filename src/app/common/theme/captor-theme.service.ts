import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptorThemeService {
  private _renderer: Renderer2;
  private _theme: string = 'dark';

  private _getSystemTheme(): string {
    if (window.matchMedia('prefers-color-scheme').media !== 'not all') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return '';
  }

  private _setTheme(theme: string) {
    this._theme = theme;
    sessionStorage.setItem('themeChoice', theme.toUpperCase());
  }

  private _getTheme() {
    const userTheme = sessionStorage.getItem('themeChoice')?.toLowerCase();

    if (userTheme) {
      this._theme = userTheme;
      return;
    }

    const systemTheme = this._getSystemTheme();

    if (systemTheme) {
      this._theme = systemTheme;
      return;
    }

    this._theme = 'dark';
  }

  loadTheme() {
    this._getTheme();
    this._renderer.addClass(document.body, `captor-theme-${this._theme}`)
  }

  updateTheme(theme: string) {
    this._setTheme(theme);
    this._renderer.removeClass(document.body, `captor-theme-${this._theme === 'dark' ? 'light' : 'dark'}`);
    this._renderer.addClass(document.body, `captor-theme-${this._theme}`);
  }

  get appTheme() {
    return this._theme;
  }

  constructor(private _factory: RendererFactory2) {
    this._renderer = this._factory.createRenderer(null, null);
  }
}
