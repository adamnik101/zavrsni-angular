import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-album-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './add-album-dialog.component.html',
  styleUrl: './add-album-dialog.component.scss'
})
export class AddAlbumDialogComponent {
  albumGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    artist: new FormControl(null, [Validators.required])
  })

}
