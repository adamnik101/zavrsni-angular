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
    AsyncPipe
  ],
  templateUrl: './tracks-form-dialog.component.html',
  styleUrl: './tracks-form-dialog.component.scss'
})
export class TracksFormDialogComponent implements FormComponent<Track>, OnInit {
    group: FormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
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
    constructor(@Inject(MAT_DIALOG_DATA) public data: FormData<Track>,
                private _artistService: ArtistService,
                private _genreService: GenreService,
                private _adminTrackService: AdminTracksService){
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
          console.log('update')
          this._adminTrackService.updateTrack(this.data.item.id,this.group).subscribe({
            next: (response) => {
              console.log(response)
            }
          })
          return
        }

      console.log('insert')
    }

  compareOwners(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2
  }
}
