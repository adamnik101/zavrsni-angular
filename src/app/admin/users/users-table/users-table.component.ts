import {Component, Input} from '@angular/core';
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {User} from "../../../user/interfaces/user";
import {AdminUserService} from "../services/admin-user.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  @Input('pagedResponse') pagedResponse: PagedResponse<User[]> = {} as PagedResponse<User[]>

  constructor(private _adminUserService: AdminUserService,
              private _matDialog: MatDialog) {
  }
  navigateTo(url: string) {
    this._adminUserService.navigateTo(url).subscribe({
      next: (pagedResponse) => {
        this._adminUserService.setPagedResponse(pagedResponse)
      }
    })
  }

  openDeleteDialog(id: string, name: string, path: string, current_page: number) {
    console.log(path, id)
    this._matDialog.open(DeleteDialogComponent, {
      data: {
        id: id,
        name: name,
        path: path,
        page: current_page
      }
    })
  }

  openEditDialog(user: User) {

  }
}
