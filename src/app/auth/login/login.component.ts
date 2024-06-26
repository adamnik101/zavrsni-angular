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
import {PlaylistService} from "../../playlists/services/playlist.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {SpinnerFunctions} from "../../core/static-functions";
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
  loginGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember: new FormControl(null)
  })
  private subscribe!: Subscription;

  constructor(private _authService: AuthService,
              private _tokenService: TokenService,
              private _userService: UserService,
              private _playlistService: PlaylistService,
              private _snackbar: SnackbarService) {
  }
  onLogin() {
    if(this.loginGroup.valid) {
      const loginData: LoginRequest = {
        email: this.loginGroup.get('email')?.value?.trim()!,
        password: this.loginGroup.get('password')?.value?.trim()!,
        remember: this.loginGroup.get('remember')?.value
      }
      SpinnerFunctions.showSpinner();
      this.subscribe = this._authService.getDataFromAllRequests(loginData).subscribe({
        next: (response) => {
          console.log(response)
          SpinnerFunctions.hideSpinner();
        },
        error: (response) => {
          const res = response.error as LoginResponseError
          this._snackbar.showFailedMessage(res.message)
        }
      })
    }
  }

  ngOnDestroy() {
    if(this.loginGroup.valid) {
      this.subscribe.unsubscribe()
    }
  }
}
