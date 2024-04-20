import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AdminRolesService} from "../../roles/services/admin-roles.service";
import {Role} from "../../../user/interfaces/role";

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {
  constructor(private _adminRoleService: AdminRolesService) {
  }
  roles: Role[] = []
  ngOnInit() {
    this._adminRoleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data
      }
    })
  }
  userGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(null, [Validators.required]),
    active: new FormControl(null, [Validators.required]),
  })

}
