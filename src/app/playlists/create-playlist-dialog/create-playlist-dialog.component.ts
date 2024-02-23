import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {max} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePlaylist} from "../interfaces/create-playlist";
import {UserService} from "../../user/services/user.service";
import {PlaylistService} from "../services/playlist.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {DialogRef} from "@angular/cdk/dialog";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {ResponseError} from "../../shared/interfaces/response-error";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Playlist} from "../interfaces/playlist";

@Component({
  selector: 'app-create-playlist-dialog',
  templateUrl: './create-playlist-dialog.component.html',
  styleUrls: ['./create-playlist-dialog.component.scss']
})
export class CreatePlaylistDialogComponent {
  isEdit: boolean = false
  maxLength: number = 300
  numberOfLetters: number = 0
  selectedFile: any = null
  @ViewChild('image') image!: ElementRef
  @ViewChild('imageUpload') imageUpload!: ElementRef
  playlist = new FormGroup({
    title : new FormControl('', [Validators.required, Validators.maxLength(100)]),
    description: new FormControl("", [Validators.maxLength(this.maxLength)]),
    image: new FormControl('')
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data : Playlist,
              private _playlistService: PlaylistService,
              private _userService: UserService,
              private _snackbarService: SnackbarService,
              private _dialog: DialogRef<CreatePlaylistDialogComponent>) {
    if (this.data) {
      this.isEdit = true
      this.playlist.patchValue({
        title: this.data.title,
        description: this.data.description,
      })
    }
  }
  ngOnInit() {
    this.playlist.controls.description.valueChanges.subscribe({
      next: (value) => {
        this.numberOfLetters = value!.length
      }
    })
  }
  confirm() {
    if (this.playlist.valid) {
      const formData = this.fillFormData()

      this._playlistService.createPlaylist(formData).subscribe({
        next: (response) => {
          this._playlistService.getPlaylists()
          this._snackbarService.showDefaultMessage(response.message)
          this._dialog.close()
        },
        error: (err) => {
          let responseError = err.error as ResponseAPI<string>
          this._snackbarService.showDefaultMessage(responseError.message)
        }
      })

    }
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
    this.selectedFile = null
  }

  update() {
    const formData = this.fillFormData()
    this._playlistService.updatePlaylist(this.data.id, formData).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  private fillFormData() {
    const formData = new FormData()

    if(this.selectedFile) {
      formData.append('image', this.selectedFile)
    }
    formData.append('title', this.playlist.controls.title.value!)
    formData.append('description', this.playlist.controls.description.value!)

    return formData
  }
}
