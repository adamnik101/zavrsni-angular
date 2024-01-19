import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AdminUserService} from "../services/admin-user.service";
import {HttpParams} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";

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

  constructor(private _adminUserService: AdminUserService) {
  }
  userFormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    active: new FormControl(null),
    createdFrom: new FormControl(undefined),
    createdTo: new FormControl(undefined),
    updatedFrom: new FormControl(undefined),
    updatedTo: new FormControl(undefined)
  })


  search() {
    let group = this.userFormGroup

    let firstName = group.get('firstName')?.value?.trim()
    let lastName = group.get('lastName')?.value?.trim()
    let email = group.get('email')?.value?.trim()
    let active = group.get('active')?.value
    let createdFrom = group.get('createdFrom')?.value
    let createdTo = group.get('createdTo')?.value
    let updatedFrom = group.get('updatedFrom')?.value
    let updatedTo = group.get('updatedTo')?.value

    this._adminUserService.params = new HttpParams()

    if(firstName) {
      this._adminUserService.params = this._adminUserService.params.append('firstName', firstName)
    }
    if(lastName) {
      this._adminUserService.params = this._adminUserService.params.append('lastName', lastName)
    }
    if(email) {
      this._adminUserService.params = this._adminUserService.params.append('email', email)
    }
    if(active !== null && active !== undefined) {
      this._adminUserService.params = this._adminUserService.params.append('active', active)
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
      next: (pagedResponse) => {
        this._adminUserService.setPagedResponse(pagedResponse)
      }
    })
  }

  reset() {
    this.userFormGroup.reset()
  }
}
