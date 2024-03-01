import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {
  AddTracksToPlaylistResponse,
  ErrorTracksToPlaylistResponse
} from "../../shared/interfaces/add-tracks-to-playlist-response";
import {Track} from "../../shared/interfaces/track";
import {PlaylistService} from "../services/playlist.service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import reset = _default.reset;
import {SnackbarService} from "../../shared/services/snackbar.service";
import {UserService} from "../../user/services/user.service";
import {Subscription} from "rxjs";

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
  private subs: Subscription[] = []
  constructor(public dialogRef: MatDialogRef<AddTracksToPlaylistDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ErrorTracksToPlaylistResponse,
              private _playlistService: PlaylistService,
              private _snackbarService: SnackbarService,
              private _userService: UserService) {
  }

  closeDialog() {
    this.dialogRef.close()
  }

  addAll(playlistId: string, tracksIds?: string[]) {
    this.addAnyway(playlistId, tracksIds!)
  }

  addNewOnes() {
    let newOnes:string[]=[]
    console.log(this.data)
    for (let id of this.data.all_tracks_id!) {
      if(!this.data.tracks_already_in_playlist.includes(id)) {
        newOnes.push(id)
      }
    }
    console.log('all:',this.data.all_tracks_id)
    console.log('already:',this.data.tracks_already_in_playlist)
    console.log('newOnes:', newOnes)
    this.addAnyway(this.data.playlist_id, newOnes)
  }

  addAnyway(playlistId: string, tracks: string[]) {
    const confirm = true
    this.subs.push(this._playlistService.addTracksToPlaylist(tracks,playlistId, confirm).subscribe({
      next: (response) => {
        this._snackbarService.showDefaultMessage(response.message)
        let playlist = this._playlistService.playlists().find(p => p.id === playlistId)

        if (playlist) {
          playlist.tracks_count = Number(playlist.tracks_count) + Number(response.data.added_count)
          this.closeDialog()

        }
        /*this.subs.push(this._playlistService.playlists$.subscribe({
          next: (playlists) => {
            let playlist = playlists.filter(p => p.id === playlistId)[0]
            if(playlist) {
              this._playlistService.trackCount.update(value => Number(value) + Number(response.data.added_count))

              playlist.tracks_count = Number(playlist.tracks_count) + response.data.added_count!
              this.closeDialog()
            }
          }
        }))*/
        console.log(response) // update playlist count tracks and success message or error
      },
      error: (response) => {
        this._snackbarService.showFailedMessage(response.message)
      }
    }))
  }
  ngOnDestroy() {
    for (let sub of this.subs) {
      sub.unsubscribe()
    }
  }
}
