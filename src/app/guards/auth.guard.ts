import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth/services/auth.service";
import {TokenService} from "../auth/services/token.service";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const router = inject(Router)
  let exists : boolean = false

  return tokenService.checkTokenFromApi().pipe(
    map(response => {
      console.log(response)
      if(response.token !== null) {
        return true
      }

      router.navigateByUrl('/auth/login')
      return false
    })
  )

};
