import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';

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
    router.navigate(['login'], { skipLocationChange: true });
  }

  return false;
};
