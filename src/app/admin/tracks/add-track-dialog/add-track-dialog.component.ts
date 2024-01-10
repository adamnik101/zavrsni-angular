import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ArtistService} from "../../../artists/services/artist.service";
import {Artist} from "../../../artists/interfaces/artist";
import {Subscription} from "rxjs";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {Album} from "../../../albums/interfaces/album";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {IsSelectedInFeaturesPipe} from "../../pipes/is-selected-in-features.pipe";

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
    IsSelectedInFeaturesPipe
  ],
  templateUrl: './add-track-dialog.component.html',
  styleUrl: './add-track-dialog.component.scss'
})
export class AddTrackDialogComponent implements OnInit, OnDestroy {
  artists: Artist[] = []
  private _subs: Subscription[] = []
  selectedOwner: Artist | null = null;
  selectedAlbum: Album | null = null;
  selectedFeatures: Artist[] = []
  constructor(private _artistService: ArtistService) { }

  ngOnInit() {
    this._subs.push(this._artistService.getArtists().subscribe({
      next: (artists) => {
        this.artists = artists
      }
    }))
  }
  ngOnDestroy() {
    for (let sub of this._subs) {
      sub.unsubscribe()
    }
  }
}
