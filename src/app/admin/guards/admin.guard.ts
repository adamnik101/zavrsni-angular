import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../../user/services/user.service";
import {map} from "rxjs";
import {TokenService} from "../../auth/services/token.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const tokenService = inject(TokenService)
  const router = inject(Router)

  return tokenService.checkTokenFromApi().pipe(
    map(response => {
      if(response.token !== null) {
        return true
      }

      router.navigateByUrl('/')
      return false
    })
    )
};
