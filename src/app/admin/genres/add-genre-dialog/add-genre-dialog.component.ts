import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AdminGenreService} from "../services/admin-genre.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";

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

  constructor(private _adminGenreService: AdminGenreService,
              private _snackbar: SnackbarService,
              private _matDialog: MatDialogRef<AddGenreDialogComponent>) {
  }
  genreForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })
  createGenre() {
    if (this.genreForm.valid) {
      this._adminGenreService.insertGenre(this.genreForm.get('name')!.value!).subscribe({
        next: (response) => {
          this._snackbar.showDefaultMessage(response.message)
          this._matDialog.close()
          this._matDialog.afterClosed().subscribe({
            next: (response) => {
              this._adminGenreService.getPagedResponse().subscribe({
                next: (genres) => {
                  this._adminGenreService.setPagedResponse(genres.data)
                }
              })
            }
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
