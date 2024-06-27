import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Artist} from "../../../artists/interfaces/artist";
import {MatButtonModule} from "@angular/material/button";
import {FormComponent} from "../../interfaces/form-component";
import {DialogData} from "../../interfaces/dialog-data";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import {AdminArtistService} from "../../services/admin-artist.service";
import { Observable } from 'rxjs';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-artist-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './artist-form-dialog.component.html',
  styleUrl: './artist-form-dialog.component.scss'
})
export class ArtistFormDialogComponent implements FormComponent<Artist>, OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<Artist>,
              private adminService: AdminService,
              private _snackbar: SnackbarService,
              private dialogRef: MatDialogRef<ArtistFormDialogComponent>
  ) { }

  group = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl(null, [Validators.required])
  });

  selectedFile: File | null = null

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.fillForm(this.data.item);
    }
  }

  fillForm(item: Artist): void {
      this.fillArtistName(item.name);
  }

  fillArtistName(name: string): void {
    this.group.get('name')?.setValue(name);
  }

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

  submitForm(): void {
    let data: FormData = this.prepareDataToSend();

    if (this.data.isEdit) {
      this.submitUpdate(data).subscribe({
        next: (data) => {


          this.close(true);
        },
        error: (err) => {
          this.close();
        }
      })
    }
    else {
      this.submitInsert(data).subscribe({
        next: (data) => {

          this.close(true);

        },
        error: (err) => {
          this.close();
        }
      })
    }
  }

  public prepareDataToSend(): FormData {
    let formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('cover', this.selectedFile);
    }
    formData.append('name', this.group.controls.name.value!)

    return formData;
  }

  submitInsert(data: FormData): Observable<any> {
    return this.adminService.insert('artists', data);
  }

  submitUpdate(data: FormData): Observable<any> {
    return this.adminService.update('artists', data, this.data.item.id);
  }

  close(state: boolean = false): void {
    this.dialogRef.close(state);
  }
}
