import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../config/config.service";
import {LoginRequest} from "../interfaces/login-request";
import {RegisterData} from "../interfaces/register-data";
import {BaseService} from "../../core/services/base.service";
import {LoginResponse} from "../interfaces/login-response";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../../user/interfaces/user";
import {Router} from "@angular/router";
import {UserService} from "../../user/services/user.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  public isLoggedIn = false
  login(data: LoginRequest) : Observable<ResponseAPI<LoginResponse>> {
    return this.post<LoginRequest, ResponseAPI<LoginResponse>>('auth/login', data )
  }

  register(data: RegisterData)  {
    return this.post('auth/register', data)
  }

  logout() {
    return this.delete<never>('auth/token')
  }
}
