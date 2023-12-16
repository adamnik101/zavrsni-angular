import { Component } from '@angular/core';
import {UserService} from "../../user/services/user.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cover: string = ''
  userSub! : Subscription
  constructor(private _userService: UserService, private _authService: AuthService) {

  }

  ngOnInit() {
    this.userSub = this._userService.user$.subscribe({
      next: (user) => {
        this.cover = user.cover
      }
    })
  }

  logout() {
    this._authService.logout()
  }
}
