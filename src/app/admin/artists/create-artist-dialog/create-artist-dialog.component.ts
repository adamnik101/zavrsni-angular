import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminArtistService} from "../../services/admin-artist.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-create-artist-dialog',
  templateUrl: './create-artist-dialog.component.html',
  styleUrls: ['./create-artist-dialog.component.scss']
})
export class CreateArtistDialogComponent {
  selectedFile: any | null = null;
  @ViewChild('image') image!: ElementRef
  @ViewChild('imageUpload') imageUpload!: ElementRef
  artist = new FormGroup({
    name : new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  constructor(private _adminArtistService: AdminArtistService,
              private _dialogRef: DialogRef<CreateArtistDialogComponent>) {
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

  removeImage() {
    this.image.nativeElement.src = 'assets/icons-svg/select.svg'
    this.imageUpload.nativeElement.value = null
    this.artist.controls.image.setValue(null)
    this.selectedFile = null
  }
  create() {
    if (this.artist.valid) {
      const formData = new FormData()

      if(this.selectedFile) {
        formData.append('image', this.selectedFile)
      }
      formData.append('name', this.artist.controls.name.value!)

      this._adminArtistService.storeArtist(formData).subscribe({
        next: (response) => {
          this._dialogRef.close()
          this._adminArtistService.getPagedResponse().subscribe({
            next:(pagedResponse) => {
              this._adminArtistService.setPagedResponse(pagedResponse.data)
            }
          })
        }
      })

    }
  }
}
