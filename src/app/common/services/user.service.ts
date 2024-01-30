import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, forkJoin, concatMap, throwError } from 'rxjs';
import { USER_DATA, CAPTOR_AUTH_TOKEN, USER_ID } from 'src/app/constant';
import { Route, Router } from '@angular/router'

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: {
    userId?: string,
    employeeEntityID?: number,
    token?: string,
    preferedTheme?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    location?: string,
    postionId?: string,
    loggedIn: boolean,
    authorizedAcessApp: boolean
    agreedToDisclaimer: boolean
  } = {
      loggedIn: false,
      authorizedAcessApp: true, // if user have access to the current application
      agreedToDisclaimer: false
    };

  get user() {
    return this._user;
  }

  /**
   * Get user token
   */
  initUser(): Observable<any> {
    const sessionStorageToken = sessionStorage.getItem(CAPTOR_AUTH_TOKEN);

    if (sessionStorageToken) {
      // try to fetech preference
      const userId = sessionStorage.getItem(USER_ID) || '';

      return this._fetchUserPreference(sessionStorageToken, userId).pipe(
        catchError((err) => {
          this._router.navigateByUrl('unauthorized');
          return throwError(() => err);
        }),
        // renew the token
        concatMap(() => this._winAuth()),
        concatMap((res) => {
          // if has a saved valid token, then skip disclaimer
          this._user.agreedToDisclaimer = true;
          const { cwopaId, token: { jwtToken } } = res;
          return this._fetchProfile(jwtToken, cwopaId);
        }),
      );
    } else {
      return this._winAuth().pipe(
        tap({ next: () => this._user.loggedIn = true }),
        concatMap((res: any) => {
          const { cwopaId, token: { jwtToken } } = res;
          const sources$ = [this._fetchProfile(jwtToken, cwopaId), this._fetchUserPreference(jwtToken, cwopaId)];
          return forkJoin([sources$]);
        })
      );
    }
  }

  /**
   * Logout. Clear session and reset user
   */
  logoutUser() {
    sessionStorage.clear();
    this._user = {
      loggedIn: false,
      authorizedAcessApp: true,
      agreedToDisclaimer: false
    };
  }

  userAgreeToDisclaimer(val: boolean) {
    this._user.agreedToDisclaimer = val;
  }

  private _winAuth(): Observable<any> {
    return this._http.post(env.URL.AUTH, options).pipe(
      tap({
        next: (res: any) => {
          const { cwopaId, token } = res;
          sessionStorage.setItem(USER_DATA, JSON.stringify(token));
          sessionStorage.setItem(CAPTOR_AUTH_TOKEN, token.jwtToken);
          sessionStorage.setItem(USER_ID, cwopaId);
          this._user.loggedIn = true;
        },
        error: err => console.log(err)
      })
    );
  }

  private _fetchProfile(token: string, userId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [CAPTOR_AUTH_TOKEN]: token
      })
    };

    return this._http.post(env.URL.PROFILE, { userId }, options)
  }

  private _fetchUserPreference(token: string, userId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [CAPTOR_AUTH_TOKEN]: token
      })
    };

    return this._http.post(env.URL.PREFERENCE, { userId }, options).pipe(
      tap((preference: any) => {
        const { themeCode, employeeEntityID } = preference;
        this._user.preferedTheme = themeCode;
        this._user.employeeEntityID = employeeEntityID;
      })
    );
  }

  private fetchMenu(): Observable<any> {
    return this._http.post(env.URL.MEMU, options);
  }

  private fetchNotification(): Observable<any> {
    return this._http.post(env.URL.ACTIVE, options);
  }

  constructor(private _http: HttpClient, private _router: Router) { }
}

