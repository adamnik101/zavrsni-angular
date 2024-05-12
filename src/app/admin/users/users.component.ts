import { Component } from '@angular/core';
import {AdminUserService} from "./services/admin-user.service";
import {LoaderService} from "../../core/services/loader.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(public adminUserService: AdminUserService,
              private _loader: LoaderService) {
  }

  ngOnInit() {
    this._loader.showLoader()
    this.adminUserService.getPagedResponse().subscribe({
      next: (response) => {
        this.adminUserService.setPagedResponse(response.data)
        this._loader.hideLoader()
      }
    })
  }
}
