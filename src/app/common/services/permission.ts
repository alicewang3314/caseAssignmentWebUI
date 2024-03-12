import { inject } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators'

/**
 *  Verify if user can access application or need to redirect to unauthorized.
*/
export const canActiveUser: CanActivateFn | CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const user$ = inject(UserService).user$;
  const router = inject(Router);

  return user$.pipe(map(({ loggedIn }) => {

    if (!loggedIn) router.navigate(['/unauthorized']);

    return loggedIn;
  }));
};

