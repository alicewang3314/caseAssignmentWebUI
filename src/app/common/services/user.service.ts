import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, forkJoin, concatMap, of } from 'rxjs';
import { USER_DATA, CAPTOR_AUTH_TOKEN, USER_ID } from 'src/app/constant';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'applicaation/json'
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
      authorizedAcessApp: false,
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
      // this._fetchUserPreferenceAndProfile().subscribe({
      //   next: () => {
      //     // renew token
      //     this._winAuth().subscribe();
      //   },
      //   error: (err) => {
      //     console.log(`WinAuth Err: ${JSON.stringify(err)}`);
      //     //TODO: redirect to unauthorized
      //   }
      // });
      return of([1, 2, 3]);

    } else {
      return this._winAuth().pipe(
        concatMap(() => {
          const sources$ = [this._fetchProfile, this._fetchUserPreference];
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
      authorizedAcessApp: false,
      agreedToDisclaimer: false
    };
  }

  private _winAuth(): Observable<any> {
    return this._http.post(env.URL.AUTH, options).pipe(
      tap((res: any) => {
        const { cwopaId, token } = res;
        sessionStorage.setItem(USER_DATA, JSON.stringify(token));
        sessionStorage.setItem(CAPTOR_AUTH_TOKEN, token.jwtToken);
        sessionStorage.setItem(USER_ID, cwopaId);
        this._user.loggedIn = true;
      })
    );
  }

  private _fetchProfile(): Observable<any> {
    return this._http.post(env.URL.PROFILE, options)
  }

  private _fetchUserPreference(): Observable<any> {
    return this._http.post(env.URL.PREFERENCE, options).pipe(
      tap((preference: any) => {
        const { themeCode, employeeEntityID } = preference;
        this._user.preferedTheme = themeCode;
        this._user.employeeEntityID = employeeEntityID;
      })
    );
  }

  // private _fetchUserPreferenceAndProfile(): Observable<any[]> {
  //   const preference = this._http.post(env.URL.PREFERENCE, options).pipe(
  //     tap()
  //   );
  //   const profile = this._http.post(env.URL.PROFILE, options);

  //   return forkJoin([profile, preference]).pipe(
  //     catchError(err => { throw err })
  //   );
  // }

  private fetchMenu(): Observable<any> {
    return this._http.post(env.URL.MEMU, options);
  }

  private fetchNotification(): Observable<any> {
    return this._http.post(env.URL.ACTIVE, options);
  }

  constructor(private _http: HttpClient) { }
}

