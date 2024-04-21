import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {Artist} from "../../../artists/interfaces/artist";
import {MatButtonModule} from "@angular/material/button";
import {FormComponent} from "../../interfaces/form-component";
import {DialogData} from "../../interfaces/dialog-data";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import {AdminArtistService} from "../../services/admin-artist.service";

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
export class ArtistFormDialogComponent implements FormComponent<Artist>, OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<Artist>,
              private _adminArtistService: AdminArtistService,
              private _snackbar: SnackbarService
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
      this.updateArtist(data)
    }
    else {
      this.insertArtist(data)
    }
  }

  public prepareDataToSend(): FormData {
    let formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('name', this.group.controls.name.value!)

    return formData;
  }

  insertArtist(data: FormData) {
    this._adminArtistService.storeArtist(data).subscribe({
      next: (data) => {

        this._snackbar.showDefaultMessage('Added new artist');
      },
      error: (err) => {

        this._snackbar.showFailedMessage('An error occurred');
      }
    })
  }

  updateArtist(data: FormData) {
    this._adminArtistService.updateArtist(this.data.item.id, data).subscribe({
      next: (data) => {

        this._snackbar.showDefaultMessage('Updated an artist');
      },
      error: (err) => {

        this._snackbar.showFailedMessage('An error occurred');
      }
    })
  }
}
