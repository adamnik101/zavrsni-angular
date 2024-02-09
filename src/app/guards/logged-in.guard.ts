import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../user/services/user.service";
import {TokenService} from "../auth/services/token.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const tokenService = inject(TokenService)
  const router = inject(Router)

  if(tokenService.getToken()) {

    router.navigateByUrl('/')
    return false
  }

  return true
};
