import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, concatMap, throwError, of, forkJoin } from 'rxjs';
import { USER_DATA, CAPTOR_AUTH_TOKEN, USER_ID, USER_BO, MOCK_TOKEN, THEME } from 'src/app/constant';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface UserState {
  userId?: string,
  employeeEntityID?: string,
  employeeId?: string,
  token?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  location?: string,
  postionId?: string,
  preferedTheme?: string,
  loggedIn: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: BehaviorSubject<UserState> = new BehaviorSubject<UserState>({
    userId: 'c-junwang',
    loggedIn: true
  });

  user$ = this.user.asObservable();

  private _menu: any[] = []

  get memu(): any[] {
    return this._menu;
  }

  private _notifications: any[] = [];

  get notifications(): any[] {
    return this._notifications;
  }

  /**
   * Get user token and information from session storage
   */
  initUser(): Observable<any> {
    const sessionStorageToken = env.useMock
      ? MOCK_TOKEN
      : sessionStorage.getItem(CAPTOR_AUTH_TOKEN);
    const userId = sessionStorage.getItem(USER_ID);

    if (sessionStorageToken) {
      // try to fetech preference
      return this._fetchUserPreference(sessionStorageToken).pipe(
        tap(_ => {
          const state = this.user.getValue();
          state.loggedIn = true;
          this.user.next(state);
        }),
        catchError((err) => {
          const state = this.user.getValue();
          state.loggedIn = false;
          this.user.next(state);

          return throwError(() => {
            return err;
          });
        }),
        // Refresh token
        concatMap(() => this._winAuth()),
        concatMap((res) => {
          const { token: { jwtToken } } = res;
          const { employeeEntityId } = JSON.parse(sessionStorage.getItem(USER_BO) || '{}');
          const calls$ = [this._fetchMenu(jwtToken, employeeEntityId), this._fetchNotification(jwtToken, employeeEntityId)];

          return forkJoin(calls$);
        })
      );
    } else {
      const state = this.user.getValue();
      state.loggedIn = false;
      this.user.next(state);
      return of();
    }
  }

  /**
   * Logout. Clear session and reset user
   */
  logout() {
    sessionStorage.clear(); // do I need to clear?
    const lastValue = this.user.getValue();
    lastValue.loggedIn = false;
    this.user.next(lastValue);
  }

  /**
   * A helper function to refresh user token
   */
  private _winAuth(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(env.URL.AUTH, options).pipe(
      tap({
        next: (res: any) => {
          const { token } = res;
          sessionStorage.setItem(USER_DATA, JSON.stringify(token));
          sessionStorage.setItem(CAPTOR_AUTH_TOKEN, token.jwtToken);
        }
      })
    );
  }

  /**
   * Helper function to get and save user preference
   */
  private _fetchUserPreference(token: string): Observable<any> {
    const userId = sessionStorage.getItem(USER_ID) || '';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [CAPTOR_AUTH_TOKEN]: token
      })
    };

    return this._http.post(env.URL.PREFERENCE, { userId }, options).pipe(
      tap((preference: any) => {
        const { themeCode, employeeEntityID } = preference;
        const state = this.user.getValue();
        state.preferedTheme = themeCode;
        state.employeeEntityID = employeeEntityID;
        this.user.next(state);
      })
    );
  }

  /**
   * Helper function to fetch and save menu
   */
  private _fetchMenu(token: string, employeeEntityId: string): Observable<any> {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [CAPTOR_AUTH_TOKEN]: token
      })
    };

    console.log('fetching menu');

    return this._http.post(env.URL.MEMU, { UserId: employeeEntityId || '' }, options).pipe(
      tap((res: any) => {
        const { menuItems } = res;
        this._menu = menuItems;
      })
    );
  }

  /**
   * Helper function to fetch and save notifications
   */
  private _fetchNotification(token: string, employeeEntityId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [CAPTOR_AUTH_TOKEN]: token
      })
    };
    return this._http.post(env.URL.ACTIVE, { employeeEntityId }, options).pipe(
      tap((res: any) => this._notifications = res)
    );
  }

  /**
   * A helper function to get user information for session storage
   */
  private _getUserFromSession() {
    const token = sessionStorage.getItem(CAPTOR_AUTH_TOKEN) || '';
    const userId = sessionStorage.getItem(USER_ID) || '';
    const {
      employeeEntityId,
      employeeId,
      firstName,
      lastName,
      middleName,
      locationName,
      position
    } = JSON.parse(sessionStorage.getItem(USER_BO) || '{}');
    const preferedTheme = sessionStorage.getItem(THEME) || 'LIGHT';

    const state = this.user.getValue();
    this.user.next({
      ...state,
      userId,
      employeeEntityID: employeeEntityId,
      token,
      firstName,
      middleName,
      lastName,
      location: locationName,
      postionId: position,
      employeeId,
      preferedTheme
    });
  }

  /**
   * A helper function to save user information in sessionstorage for the local environment
   */
  private setMockUserInSession() {

  }

  constructor(private _http: HttpClient, private _router: Router) {
    this.user$.subscribe(val => console.log(`is user logged in ${JSON.stringify(val)}`))
  }
}

