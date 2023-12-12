import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../user/services/user.service";
import {User} from "../user/interfaces/user";
import {BehaviorSubject} from "rxjs";

export const restrictAuthorizedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)

  if(userService.user$) {
    userService.user$ = new BehaviorSubject<User>({} as User)
    return false
  }
  return true
};
