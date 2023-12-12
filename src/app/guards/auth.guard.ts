import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../auth/services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token')
  return !!token;
};
