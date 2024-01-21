import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ArtistService} from "../../../artists/services/artist.service";
import {Artist} from "../../../artists/interfaces/artist";
import {Subscription} from "rxjs";
import {MatSelectModule} from "@angular/material/select";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Album} from "../../../albums/interfaces/album";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {IsSelectedInFeaturesPipe} from "../../pipes/is-selected-in-features.pipe";
import {GenreService} from "../../../genre/services/genre.service";
import {Genre} from "../../../genre/interfaces/genre";
import {MatIconModule} from "@angular/material/icon";
import {AdminTracksService} from "../services/admin-tracks.service";
import {DialogRef} from "@angular/cdk/dialog";
import {SnackbarService} from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-add-track-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatGridListModule,
    IsSelectedInFeaturesPipe,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './add-track-dialog.component.html',
  styleUrl: './add-track-dialog.component.scss'
})
export class AddTrackDialogComponent implements OnInit, OnDestroy {
  artists: Artist[] = []
  genres: Genre[] = []
  private _subs: Subscription[] = []
  @ViewChild('image') image!: ElementRef
  @ViewChild('inputTrack') inputTrack!: ElementRef
  trackInfo: any
  trackForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    cover: new FormControl(null, [Validators.required]),
    track: new FormControl(null, [Validators.required]),
    owner : new FormControl(null, [Validators.required]),
    features : new FormControl([]),
    album : new FormControl({value: null, disabled: true}),
    genre : new FormControl(null, [Validators.required]),
    explicit: new FormControl(false)
  })
  constructor(private _artistService: ArtistService,
              private _genreService: GenreService,
              private _trackService: AdminTracksService,
              private _dialogRef: DialogRef<AddTrackDialogComponent>,
              private _snackbar: SnackbarService) { }

  ngOnInit() {
    this._subs.push(this._artistService.getArtists().subscribe({
      next: (artists) => {
        this.artists = artists
      }
    }))
    this._subs.push(this._genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres
      }
    }))
  }
  onFileSelected(event: any, control: string) {
    this.trackForm.get(control)?.setValue(event.target.files[0] ?? null)

    if (this.trackForm.get(control)?.value) {
      const reader = new FileReader();
      reader.readAsDataURL(this.trackForm.get(control)?.value);

      reader.onload = (e) => {
        console.log(e.target)
        if(control === 'track') {
          this.trackInfo = this.inputTrack.nativeElement.value.split('\\')[2]
        } else if(control === 'cover') {
          this.image.nativeElement.src = e.target?.result;
        }
      };
    }
  }
  ngOnDestroy() {
    for (let sub of this._subs) {
      sub.unsubscribe()
    }
  }

  confirm() {
    let formData = new FormData()

    if(this.trackForm.valid) {
      formData.append('title', this.trackForm.get('title')?.value)
      formData.append('cover', this.trackForm.get('cover')?.value)
      formData.append('track', this.trackForm.get('track')?.value)
      formData.append('owner', (this.trackForm.get('owner')!.value as Artist).id)
      formData.append('explicit', this.trackForm.get('explicit')?.value)
      formData.append('genre', (this.trackForm.get('genre')?.value as Genre).id)

      if(this.trackForm.get('album')?.value) {
        formData.append('album', (this.trackForm.get('album')?.value as Album).id)
      }
      if(this.trackForm.get('features')?.value) {
        for(let feature of (this.trackForm.get('features')!.value) as Artist[] ) {
            formData.append('features[]', feature.id)
        }

      }

      this._trackService.addTrack(formData).subscribe({
        next: (response) => {
          console.log(response)
          //this._dialogRef.close()
          this._snackbar.showSuccessMessage(response as string)
        },
        error: (errResponse) => {
          console.log(errResponse)
          this._snackbar.showFailedMessage(errResponse as string)
        }
      })

      console.log(formData)
    }
  }
}
