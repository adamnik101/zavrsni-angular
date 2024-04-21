import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminGenreService} from "../services/admin-genre.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import {DialogData} from "../../interfaces/dialog-data";
import {Track} from "../../../shared/interfaces/track";
import {Genre} from "../../../genre/interfaces/genre";

@Component({
  selector: 'app-genres-form-dialog',
  standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
  templateUrl: './genres-form-dialog.component.html',
  styleUrl: './genres-form-dialog.component.scss'
})
export class GenresFormDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<Genre>,
              private _adminGenreService: AdminGenreService,
              private _snackbar: SnackbarService,
              private _matDialog: MatDialogRef<GenresFormDialogComponent>) {
  }

  genreForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if(this.data.isEdit) {
      this.fillForm();
    }
  }

  fillForm(): void {
    this.fillGenreName();
  }

  fillGenreName(): void {
    this.genreForm.get('name')?.setValue(this.data.item.name);
  }

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

  submitForm(): void {
    if(this.data.isEdit) {

    }
    else {
      this.createGenre();
    }
  }
}
