import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AdminUserService} from "../services/admin-user.service";
import {HttpParams} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {AdminRolesService} from "../../roles/services/admin-roles.service";
import {Role} from "../../../user/interfaces/role";

@Component({
  selector: 'app-user-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './user-search-form.component.html',
  styleUrl: './user-search-form.component.scss'
})
export class UserSearchFormComponent {

  constructor(private _adminUserService: AdminUserService,
              private _adminRoleService: AdminRolesService) {
  }
  userFormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    active: new FormControl(null),
    role: new FormControl(null),
    createdFrom: new FormControl(undefined),
    createdTo: new FormControl(undefined),
    updatedFrom: new FormControl(undefined),
    updatedTo: new FormControl(undefined)
  })
  roles: Role[] = []
  ngOnInit() {
    this._adminRoleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data
      }
    })
  }
  search() {
    let group = this.userFormGroup

    let username = group.get('username')?.value?.trim()
    let email = group.get('email')?.value?.trim()
    let active = group.get('active')?.value
    let role = group.get('role')?.value
    let createdFrom = group.get('createdFrom')?.value
    let createdTo = group.get('createdTo')?.value
    let updatedFrom = group.get('updatedFrom')?.value
    let updatedTo = group.get('updatedTo')?.value

    this._adminUserService.params = new HttpParams()

    if(username) {
      this._adminUserService.params = this._adminUserService.params.append('username', username)
    }
    if(email) {
      this._adminUserService.params = this._adminUserService.params.append('email', email)
    }
    if(active !== null && active !== undefined) {
      this._adminUserService.params = this._adminUserService.params.append('active', active)
    }
    if (role !== null && role !== undefined) {
      this._adminUserService.params = this._adminUserService.params.append('role', role)
    }
    if(createdFrom) {
      this._adminUserService.params = this._adminUserService.params.append('createdFrom', createdFrom)
    }
    if(createdTo) {
      this._adminUserService.params = this._adminUserService.params.append('createdTo', createdTo)
    }
    if(updatedFrom) {
      this._adminUserService.params = this._adminUserService.params.append('updatedFrom', updatedFrom)
    }
    if(updatedTo) {
      this._adminUserService.params = this._adminUserService.params.append('updatedTo', updatedTo)
    }

    this._adminUserService.getPagedResponse(this._adminUserService.params).subscribe({
      next: (response) => {
        this._adminUserService.setPagedResponse(response.data)
      }
    })
  }

  reset() {
    this.userFormGroup.reset()
  }
}
