import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-artist-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './add-artist-dialog.component.html',
  styleUrl: './add-artist-dialog.component.scss'
})
export class AddArtistDialogComponent {
  artistGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

}
