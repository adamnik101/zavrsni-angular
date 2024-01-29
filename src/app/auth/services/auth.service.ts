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

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  public isLoggedIn = false

  login(data: LoginRequest) : Observable<LoginResponse> {
    return this.post<LoginRequest, LoginResponse>('auth/login', data )
  }

  register(data: RegisterData)  {
    return this.post('auth/register', data)
  }

  logout() {
    this.isLoggedIn = false
  }
}
