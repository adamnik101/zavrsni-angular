import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-edit-user-name-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './edit-user-name-dialog.component.html',
  styleUrl: './edit-user-name-dialog.component.scss'
})
export class EditUserNameDialogComponent {

}
