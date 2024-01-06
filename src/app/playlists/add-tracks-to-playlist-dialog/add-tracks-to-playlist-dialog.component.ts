import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {AddTracksToPlaylistResponse} from "../../shared/interfaces/add-tracks-to-playlist-response";
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
              @Inject(MAT_DIALOG_DATA) public data: AddTracksToPlaylistResponse,
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

    for (let id of this.data.allTracksIds!) {
      if(!this.data.tracksAlreadyInPlaylist.includes(id)) {
        newOnes.push(id)
      }
    }
    console.log('all:',this.data.allTracksIds)
    console.log('already:',this.data.tracksAlreadyInPlaylist)
    console.log('newOnes:', newOnes)
    this.addAnyway(this.data.playlistId, newOnes)
  }

  addAnyway(playlistId: string, tracks: string[]) {
    const confirm = true
    this.subs.push(this._playlistService.addTracksToPlaylist(tracks,playlistId, confirm).subscribe({
      next: (response) => {
        this._snackbarService.showSuccessMessage(response.message)

        this.subs.push(this._playlistService.playlists$.subscribe({
          next: (playlists) => {
            let playlist = playlists.filter(p => p.id === playlistId)[0]
            if(playlist) {
              this._playlistService.trackCount.update(value => Number(value) + Number(response.addedCount))

              playlist.tracks_count = Number(playlist.tracks_count) + response.addedCount!
              this.closeDialog()
            }
          }
        }))
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
