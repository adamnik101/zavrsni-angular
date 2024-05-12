import {Component, inject} from '@angular/core';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../../user/services/user.service";

@Component({
  selector: 'app-admin-nav-links',
  standalone: true,
    imports: [
        MatDividerModule,
        MatIconModule,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './admin-nav-links.component.html',
  styleUrl: './admin-nav-links.component.scss'
})
export class AdminNavLinksComponent {
  public userService = inject(UserService)
}
