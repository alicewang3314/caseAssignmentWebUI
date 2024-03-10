import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { environment as env} from 'src/environments/environment';

/**
 *  Verify if user can access application.
*/
export const canActiveUser: CanActivateFn | CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(UserService);
  const canActiveApp = auth.user.loggedIn && auth.user.authorizedAcessApp;

  if (canActiveApp) return true;

  if (!auth.user.loggedIn) {
    const unauthorizedUrl = `${env.baseUrl}/#!/captor/unauthorized`;
    window.location.href = unauthorizedUrl;
  }

  return false;
};

