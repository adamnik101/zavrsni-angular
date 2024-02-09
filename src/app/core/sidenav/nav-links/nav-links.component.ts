import {Component, inject} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {UserService} from "../../../user/services/user.service";

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss']
})
export class NavLinksComponent {
  public userService = inject(UserService)
}
