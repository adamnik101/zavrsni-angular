import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {AddTracksToPlaylistResponse} from "../../shared/interfaces/add-tracks-to-playlist-response";
import {Track} from "../../shared/interfaces/track";
import {PlaylistService} from "../services/playlist.service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import reset = _default.reset;

@Component({
  selector: 'app-add-tracks-to-playlist-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './add-tracks-to-playlist-dialog.component.html',
  styleUrl: './add-tracks-to-playlist-dialog.component.scss'
})
export class AddTracksToPlaylistDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddTracksToPlaylistDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddTracksToPlaylistResponse,
              private _playlistService: PlaylistService) {
  }

  onNoClick() {
    this.dialogRef.close()
  }

  addAll(playlistId: string, tracksIds?: string[]) {
    console.log(playlistId, tracksIds)
  }

  addNewOnes() {

  }

  addAnyway(playlistId: string, tracks: string[]) {
    const confirm = true
    return this._playlistService.addTracksToPlaylist(tracks,playlistId, confirm).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }
}
