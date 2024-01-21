import {Component, Inject, OnInit, Signal, signal} from '@angular/core';
import {FormComponent} from "../../interfaces/form-component";
import {Track} from "../../../shared/interfaces/track";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormData} from "../../interfaces/form-data";
import {IsSelectedInFeaturesPipe} from "../../pipes/is-selected-in-features.pipe";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {Artist} from "../../../artists/interfaces/artist";
import {ArtistService} from "../../../artists/services/artist.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {OwnerValue} from "../../interfaces/owner-value";
import {Genre} from "../../../genre/interfaces/genre";
import {GenreService} from "../../../genre/services/genre.service";
import {AdminTracksService} from "../services/admin-tracks.service";
import {ImageFormFieldComponent} from "../../components/image-form-field/image-form-field.component";
import {SnackbarService} from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-tracks-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IsSelectedInFeaturesPipe,
    MatOptionModule,
    MatSelectModule,
    AsyncPipe,
    ImageFormFieldComponent
  ],
  templateUrl: './tracks-form-dialog.component.html',
  styleUrl: './tracks-form-dialog.component.scss'
})
export class TracksFormDialogComponent implements FormComponent<Track>, OnInit {
    group: FormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      cover: new FormControl(null, [Validators.required]),
      owner : new FormControl(null, [Validators.required]),
      features : new FormControl([]),
      explicit: new FormControl(null, [Validators.required]),
      album : new FormControl({value: null, disabled: true}),
      genre: new FormControl(null, [Validators.required])
    })
    private artistsSubject = new BehaviorSubject<Artist[]>([])
    artists$ = this.artistsSubject.asObservable()
    artists : Artist[] = []
    genres : Genre[] = []
    subscriptions: Subscription[] = []
    owner = signal<Artist | undefined>(undefined)
    imageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    maxImageSize = 2000000 //2MB
    selectedImageSrc = ''
    constructor(@Inject(MAT_DIALOG_DATA) public data: FormData<Track>,
                private _artistService: ArtistService,
                private _genreService: GenreService,
                private _adminTrackService: AdminTracksService,
                private _snackbar: SnackbarService){
    }

    ngOnInit() {
      this.subscriptions.push(
        this._artistService.getArtists().subscribe({
          next: (artists) => {
           this.artistsSubject.next(artists)
            this.artists = artists
            if(this.data.isEdit) {
              this.getOwnerAlbums(artists)
            }
          }
        })
      )
      this.subscriptions.push(
        this._genreService.getGenres().subscribe({
          next: (genres) => {
            this.genres = genres
          }
        })
      )

      if(this.data.isEdit) {
        this.fillForm(this.data.item)
      }
    }

    fillForm(item: Track): void {
      console.log(item.owner.albums)
        this.group.get('title')?.setValue(item.title)
        this.group.get('owner')?.setValue(item.owner)
        this.group.get('explicit')?.setValue(item.explicit)
        this.group.get('cover')?.setValue(item.cover)
        this.group.get('genre')?.setValue(item.genre_id)
        if(this.group.get('owner')?.value) {
          if(item.owner.albums.length > 0) {
            this.group.get('album')?.setValue(item.album?.id)
            this.group.get('album')?.enable()
          }
        }
        if(item.features.length > 0) {
          let featureIds = []
          for(let feature of item.features) {
            featureIds.push(feature.id)
          }
          this.group.get('features')?.setValue(featureIds)
        }
        console.log(this.group)
    }
    ngOnDestroy() {
      for (let sub of this.subscriptions) {
        console.log(sub)
        sub.unsubscribe()
      }
    }

    getOwnerAlbums(artists: Artist[] | Observable<Artist[]>) {
      if(artists instanceof Observable) {
        artists.subscribe({
          next: (response) => {
            console.log(response)
            console.log(this.group.get('owner')?.value, this.owner())
          }
        })
      }
      //this.owner.set(this.artists()?.find(artist => artist.id === this.group.get('owner')?.value))
    }

    finish() {
        if(this.data.isEdit && this.group.valid) {
          console.log(this.group)
          console.log('update')
          this._adminTrackService.updateTrack(this.data.item.id,this.group).subscribe({
            next: (response) => {
              console.log(response)
            },
            error: (err) => {
              console.log(err.error.msg)
            }
          })
          return
        }

      console.log('insert')
    }

  compareOwners(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2
  }
  onFileSelected(event: any, control: string) {
      let file = event.target.files[0] ?? null
    if(file) {
      if(!this.imageTypes.includes(file.type)) {
        this._snackbar.showFailedMessage('You must provide an image!')
        return
      }
      if(file.size > this.maxImageSize) {
        this._snackbar.showFailedMessage('Image size cannot exceed 2MB!')
        return
      }
    }
    this.group.get(control)?.setValue(event.target.files[0] ?? null)

    if (this.group.get(control)?.value) {
      const reader = new FileReader()
      reader.readAsDataURL(this.group.get(control)?.value)

      reader.onload = (e) => {
        console.log(e.target)
        if(control === 'track') {
          //this.trackInfo = this.inputTrack.nativeElement.value.split('\\')[2]
        } else if(control === 'cover') {
          console.log(this.group.get('cover')?.value)
          this.group.get('cover')?.setValue(file)
          this.selectedImageSrc = e.target?.result as string
          //this.image.nativeElement.src = e.target?.result;
        }
      };
    }
  }
}
