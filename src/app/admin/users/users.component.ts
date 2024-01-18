import { Component } from '@angular/core';
import {AdminUserService} from "./services/admin-user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(public adminUserService: AdminUserService) {
  }

  ngOnInit() {
    this.adminUserService.getPagedResponse().subscribe({
      next: (pagedResponse) => {
        this.adminUserService.setPagedResponse(pagedResponse)
      }
    })
  }
}
