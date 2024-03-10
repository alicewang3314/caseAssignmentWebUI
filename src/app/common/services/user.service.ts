import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, concatMap, throwError, of } from 'rxjs';
import { USER_DATA, CAPTOR_AUTH_TOKEN, USER_ID, USER_BO, MOCK_TOKEN } from 'src/app/constant';
import { Router } from '@angular/router';

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
    employeeEntityID?: string,
    token?: string,
    preferedTheme?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    location?: string,
    postionId?: string,
    loggedIn: boolean,
    authorizedAcessApp: boolean,
  } = {
      loggedIn: true,
      authorizedAcessApp: true // if user have access to the current application
    };

  get user() {
    return this._user;
  }

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
    const userId = sessionStorage.getItem(USER_ID) || '';
    const unauthorizedUrl = `${env.baseUrl}/#!/captor/unauthorized`;

    if (sessionStorageToken) {
      // try to fetech preference
      return this._fetchUserPreferenceAndNotification(sessionStorageToken, userId).pipe(
        tap(_ => this._user.loggedIn = true),
        // check if the token can access preference
        catchError((err) => {
          // window.location.href = unauthorizedUrl;

          return throwError(() => {
            console.error(err);
            return err;
          });
        }),
        // Refresh token
        concatMap(() => this._winAuth()),
        concatMap((res) => {// if the saved token valid,
          const { cwopaId, token: { jwtToken } } = res;
          return this._fetchMenu(jwtToken);
        })
      );
    } else {
      // redirect to captor if no token found

      // window.location.href = unauthorizedUrl;
      return of({});
    }
  }

  /**
   * Logout. Clear session and reset user
   */
  logout() {
    sessionStorage.clear();
    this._user = {
      loggedIn: false,
      authorizedAcessApp: true
    };
    this._menu = [];
  }

  /**
   * A helper function to refresh user token
   */
  private _winAuth(): Observable<any> {
    return this._http.post(env.URL.AUTH, options).pipe(
      tap({
        next: (res: any) => {
          const { token } = res;
          sessionStorage.setItem(USER_DATA, JSON.stringify(token));
          sessionStorage.setItem(CAPTOR_AUTH_TOKEN, token.jwtToken);
          this._user.loggedIn = true;
        },
        error: err => console.log(err)
      })
    );
  }

  // // TODO: REMOVE
  // private _fetchProfile(token: string, userId: string): Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       [CAPTOR_AUTH_TOKEN]: token
  //     })
  //   };

  //   console.log('fetching profile');
  //   return this._http.post(env.URL.PROFILE, { userId }, options).pipe(
  //     tap({
  //       next: (res: any) => {
  //         const { userBO, roleBOList } = res;
  //         sessionStorage.setItem(USER_ROLE, JSON.stringify(roleBOList));
  //         sessionStorage.setItem(USER_BO, JSON.stringify(userBO));
  //       }
  //     })
  //   );
  // }

  /**
   * Helper function to get and save user preference
   */
  private _fetchUserPreferenceAndNotification(token: string, userId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [CAPTOR_AUTH_TOKEN]: token
      })
    };

    console.log('fetching preference');

    return this._http.post(env.URL.PREFERENCE, { userId }, options).pipe(
      tap((preference: any) => {
        const { themeCode, employeeEntityID } = preference;
        this._user.preferedTheme = themeCode;
        this._user.employeeEntityID = employeeEntityID;
      })
    );
  }

  /**
   * Helper function to fetch and save menu
  */
  private _fetchMenu(token: string): Observable<any> {
    const { employeeEntityId } = JSON.parse(sessionStorage.getItem(USER_BO) || '{}');
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

  constructor(private _http: HttpClient, private _router: Router) { }
}

