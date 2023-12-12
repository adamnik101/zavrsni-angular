import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Artist} from "../../../artists/interfaces/artist";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminArtistService} from "../../services/admin-artist.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-edit-artist-dialog',
  templateUrl: './edit-artist-dialog.component.html',
  styleUrls: ['./edit-artist-dialog.component.scss']
})
export class EditArtistDialogComponent {
  selectedFile: any
  @ViewChild('image') image!: ElementRef
  @ViewChild('imageUpload') imageUpload!: ElementRef
  form = new FormGroup({
    name: new FormControl(this.artist.name, [Validators.maxLength(50)]),
    image: new FormControl('')
  })
  constructor(@Inject(MAT_DIALOG_DATA) public artist: Artist,
              private _adminArtistService: AdminArtistService,
              private _snackBar: SnackbarService,
              private _dialogRef: DialogRef<EditArtistDialogComponent>) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = (e) => {
        this.image.nativeElement.src = e.target?.result;

      };
    }
  }

  resetImage() {
    this.imageUpload.nativeElement.value = null
    this.image.nativeElement.src = this.artist.cover
    this.selectedFile = null
  }

  confirm() {
    if(this.form.valid) {
      const formData = new FormData()
      const name = this.form.controls.name.value
      if(this.selectedFile) {
        formData.append('image', this.selectedFile)
      }

      formData.append('name', name!)
      if(name != this.artist.name || this.selectedFile) {
        this._adminArtistService.updateArtist(this.artist.id, formData).subscribe({
          next: (response) => {
            this._adminArtistService.pagedResponse$.subscribe({
              next:(pagedResponse) => {
                let index = pagedResponse.data.findIndex((artist) => {
                  return artist.id == response.id
                })
                pagedResponse.data[index] = response
                this._dialogRef.close()
              }
            })
            console.log(response)
          }
        })
      }
      else{
        this._snackBar.showFailedMessage('Nothing to change')
      }

    }
  }
}
