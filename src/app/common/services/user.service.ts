import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, forkJoin, concatMap, throwError } from 'rxjs';
import { USER_DATA, CAPTOR_AUTH_TOKEN, USER_ID, USER_ROLE, USER_BO } from 'src/app/constant';
import { Router } from '@angular/router'

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
    agreedToDisclaimer: boolean,

  } = {
      loggedIn: false,
      authorizedAcessApp: true, // if user have access to the current application
      agreedToDisclaimer: false
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
   * Get user token
   */
  initUser(): Observable<any> {
    const sessionStorageToken = sessionStorage.getItem(CAPTOR_AUTH_TOKEN);

    if (sessionStorageToken) {
      // try to fetech preference
      const userId = sessionStorage.getItem(USER_ID) || '';

      return this._fetchUserPreferenceAndNotification(sessionStorageToken, userId).pipe(
        // check if the token can access preference
        catchError((err) => {
          this._router.navigate(['/unauthorized']);
          return throwError(() => {
            console.error(err);
            return err;
          });
        }),
        // get a newer token 
        concatMap(() => this._winAuth()),
        concatMap((res) => {// if the saved token valid, dont need to show the disclaimer
          this._user.agreedToDisclaimer = true;
          const { cwopaId, token: { jwtToken } } = res;
          const calls$ = [this._fetchProfile(jwtToken, cwopaId), this._fetchMenu(jwtToken, cwopaId)];
          return forkJoin(calls$);
        })
      );
    } else {
      return this._winAuth();
    }
  }


  /**
   * Logout. Clear session and reset user
   */
  logout() {
    sessionStorage.clear();
    this._user = {
      loggedIn: false,
      authorizedAcessApp: true,
      agreedToDisclaimer: false
    };
    this._menu = [];
  }


  userAgreeToDisclaimer(val: boolean) {
    this._user.agreedToDisclaimer = val;
    // if user agree to disclaimer, load profile, reference, menu, and active
    const calls$ = [
      this._fetchUserPreferenceAndNotification(this._user.token || '', this._user.userId || ''),
      this._fetchProfile(this._user.token || '', this._user.userId || ''),
      this._fetchMenu(this._user.token || '', this._user.userId || '')
    ];
    forkJoin(calls$).subscribe();
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

    console.log('fetching profile');
    return this._http.post(env.URL.PROFILE, { userId }, options).pipe(
      tap({
        next: (res: any) => {
          const { userBO, roleBOList } = res;
          sessionStorage.setItem(USER_ROLE, JSON.stringify(roleBOList));
          sessionStorage.setItem(USER_BO, JSON.stringify(userBO));
        }
      })
    );
  }

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
      }),
      // If succuessfully fetch preference, fetch notification
      // Fetch notification will use the employeeEntityID from preference
      concatMap((res: any) => {
        const { employeeEntityID } = res;
        return this._fetchNotification(token || '', employeeEntityID);
      })
    );
  }

  private _fetchMenu(token: string, UserId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [CAPTOR_AUTH_TOKEN]: token
      })
    };

    console.log('fetching menu');

    return this._http.post(env.URL.MEMU, { UserId }, options).pipe(
      tap((res: any) => {
        const { menuItems } = res;
        this._menu = menuItems;
      })
    );
  }

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

