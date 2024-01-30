import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, ActivatedRoute } from '@angular/router';

/**
 *  Verify if user can access application.
*/
export const canActiveUser: CanActivateFn | CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(UserService);
  const router = inject(Router);
  const canActiveApp = auth.user.loggedIn && auth.user.authorizedAcessApp && auth.user.agreedToDisclaimer;

  if (canActiveApp) return true;

  if (!auth.user.loggedIn) {
    router.navigateByUrl('unauthorized');
  } else if (!auth.user.agreedToDisclaimer) {
    router.navigateByUrl('login');
  }

  return false;
};

