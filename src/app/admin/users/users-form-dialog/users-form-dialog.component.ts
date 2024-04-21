import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminRolesService} from "../../roles/services/admin-roles.service";
import {Role} from "../../../user/interfaces/role";
import {User} from "../../../user/interfaces/user";
import {DialogData} from "../../interfaces/dialog-data";

@Component({
  selector: 'app-users-form-dialog',
  standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
  templateUrl: './users-form-dialog.component.html',
  styleUrl: './users-form-dialog.component.scss'
})
export class UsersFormDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<User>,
              private _adminRoleService: AdminRolesService) {
  }

  roles: Role[] = []

  ngOnInit() {
    if(this.data.isEdit) {
      this.fillForm();
    }
    this._adminRoleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data
      }
    })
  }

  fillForm(): void {
    this.fillUsername();
    this.fillEmail();
    this.fillRole();
    this.fillActive();
  }

  fillUsername(): void {
    this.userGroup.get('username')?.setValue(this.data.item.username);
  }
  fillEmail(): void {
    this.userGroup.get('email')?.setValue(this.data.item.email);
  }
  fillRole(): void {
    this.userGroup.get('role')?.setValue(this.data.item.role.id);
  }
  fillActive(): void {
    this.userGroup.get('active')?.setValue(this.data.item.active);
  }
  userGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    active: new FormControl(false, [Validators.required]),
  })

}
