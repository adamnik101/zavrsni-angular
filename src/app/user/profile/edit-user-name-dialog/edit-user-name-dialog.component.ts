import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {User} from "../../interfaces/user";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import { UserRequestsService } from '../../services/requests/user-requests.service';

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
export class EditUserNameDialogComponent implements OnInit{
  form = new FormGroup({
    username: new FormControl('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private _userService: UserService,
              private _snackbar: SnackbarService,
              private _matDialogRef: MatDialogRef<EditUserNameDialogComponent>,
              private userRequests: UserRequestsService) {
    
  }

  ngOnInit(): void {
    if(this.data) {
      this.setUsername(this.data)
    }  
  }

  setUsername(user: User): void {
    this.form.get('username')?.setValue(user.username);
  }

  updateUsername() {
    if (this.form.valid) {
      this.userRequests.updateUsername(this.form.get('username')!.value!).subscribe({
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
