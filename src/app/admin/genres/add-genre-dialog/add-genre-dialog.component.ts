import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-genre-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './add-genre-dialog.component.html',
  styleUrl: './add-genre-dialog.component.scss'
})
export class AddGenreDialogComponent {
  genreForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })
}
