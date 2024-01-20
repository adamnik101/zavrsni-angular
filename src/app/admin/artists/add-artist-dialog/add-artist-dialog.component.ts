import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {SnackbarService} from "../../../shared/services/snackbar.service";

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

  constructor(private _snackbar: SnackbarService) {
  }
  artistGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl(null, [Validators.required])
  })
  selectedFile: File | null = null

  onSelectedImage(event: any) {
    this.selectedFile = event.target.files[0] ?? null

    if(this.selectedFile) {
      if(this.selectedFile.size > 2000000) {
        this._snackbar.showDefaultMessage('Size of file cannot exceed 2MB')
        this.selectedFile = null
        return
      }

    }
  }
}
