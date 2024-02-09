import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Observable} from "rxjs";
import {User} from "../../user/interfaces/user";
import {TokenResponse} from "../interfaces/token-response";

@Injectable({
  providedIn: 'root'
})
export class TokenService extends BaseService{

  removeToken() {
    localStorage.removeItem('token')
  }

  checkTokenFromApi(): Observable<TokenResponse> {
    return this.get<TokenResponse>('auth/token')
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
