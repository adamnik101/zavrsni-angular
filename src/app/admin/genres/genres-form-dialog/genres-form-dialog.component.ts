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
import {AdminService} from "../../services/admin.service";
import {FormComponent} from "../../interfaces/form-component";
import {Observable} from "rxjs";

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
export class GenresFormDialogComponent implements FormComponent<Genre>, OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<Genre>,
              private _adminGenreService: AdminGenreService,
              private adminService: AdminService,
              private _snackbar: SnackbarService,
              private dialogRef: MatDialogRef<GenresFormDialogComponent>) { }

  group = new FormGroup({
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
    this.group.get('name')?.setValue(this.data.item.name);
  }

  submitForm(): void {
    let data = this.prepareDataToSend();
    if(this.data.isEdit) {
      this.submitUpdate(data).subscribe({
        next: (response) => {
          this.close(true);
        },
        error: (err) => {
          this.close();
        }
      });
    }
    else {
      this.submitInsert(data).subscribe({
        next: (data) => {
          this.close(true);
        },
        error: (err) => {
          this.close();
        }
      });
    }
  }

  prepareDataToSend(): FormData {
    let formData = new FormData();

    formData.append('name', this.group.get('name')?.value!)

    return formData;
  }

  submitUpdate(data: FormData): Observable<any> {
    return this.adminService.update('genres', data, this.data.item.id)
  }

  submitInsert(data: FormData): Observable<any> {
    return this.adminService.insert('genres', data);
  }

  close(state: boolean = false): void {
    this.dialogRef.close(state);
  }
}
