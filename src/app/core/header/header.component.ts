import { Component } from '@angular/core';
import {UserService} from "../../user/services/user.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {TokenService} from "../../auth/services/token.service";
import {Router} from "@angular/router";
import {LoaderService} from "../services/loader.service";
import { SpinnerFunctions } from '../static-functions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cover: string = ''
  userSub! : Subscription
  constructor(protected _userService: UserService,
              private _authService: AuthService,
              private _tokenService: TokenService,
              private _router: Router,
              private _loaderService: LoaderService) {

  }

  ngOnInit() {
    this.userSub = this._userService.user$.subscribe({
      next: (user) => {
        if(user) {
          this.cover = user.cover
        }
      }
    })
  }

  logout() {
    SpinnerFunctions.showSpinner();
    this._authService.logout().subscribe({
      next: (response) => {
        this._tokenService.removeToken()
        this._userService.userLoaded.set(false)
        this._userService.unsetAllUserRelevantSubjects()
        this._router.navigateByUrl('/auth/login')
        SpinnerFunctions.hideSpinner();
      }
    })
  }
}
