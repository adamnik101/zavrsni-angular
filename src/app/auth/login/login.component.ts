import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoginRequest} from "../interfaces/login-request";
import {LoginResponseError} from "../interfaces/login-response-error";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TokenService} from "../services/token.service";
import {UserService} from "../../user/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../user/interfaces/user";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = ''
  remember: boolean = false
  error: string = ''

  constructor(private _authService: AuthService,
              private _tokenService: TokenService,
              private _userService: UserService,
              private _router: Router) {
  }
  ngOnInit() {

  }
  onLogin() {
    const loginData: LoginRequest = {
      email: this.email,
      password: this.password,
      remember: this.remember
    }
    const subscribe = this._authService.login(loginData).subscribe({
      next: (response) => {
        if (response.token) {
          this._tokenService.setToken(response.token)
          this._userService.getUser(true)
        }
      },
      error: (response) => {
        const res = response.error as LoginResponseError
        this.error = res.message
      },
      complete: () =>  {

        subscribe.unsubscribe()
      }
    })
  }
}
