import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {
  userGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

}
