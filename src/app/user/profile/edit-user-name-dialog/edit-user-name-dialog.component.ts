import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {User} from "../../interfaces/user";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-edit-user-name-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-user-name-dialog.component.html',
  styleUrl: './edit-user-name-dialog.component.scss'
})
export class EditUserNameDialogComponent {
  username = new FormGroup({
    username: new FormControl('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private _userService: UserService,
              private _snackbar: SnackbarService,
              private _matDialogRef: MatDialogRef<EditUserNameDialogComponent>) {
    this.username.setValue({
      username : data.username
    })
  }

  updateUsername() {
    if (this.username.valid) {
      this._userService.updateUsername(this.username.get('username')!.value!).subscribe({
        next: (response) => {
          this._snackbar.showDefaultMessage(response.message)
          this._matDialogRef.close(response.data.username)
        },
        error: (err) => {
          console.log(err)
          this._snackbar.showDefaultMessage(err.error.errors.username[0])
        }
      })
    }
  }
}
