import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {Playlist} from "../interfaces/playlist";
import {AudioService} from "../../audio/audio.service";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {PlaylistService} from "../services/playlist.service";
import {UserService} from "../../user/services/user.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  ConfirmPlaylistDeleteDialogComponent
} from "../confirm-playlist-delete-dialog/confirm-playlist-delete-dialog.component";
import {QueueService} from "../../queue/services/queue.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {CreatePlaylistDialogComponent} from "../create-playlist-dialog/create-playlist-dialog.component";

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent {
  @Input('playlist') playlist!: Playlist
  from : From = {} as From
  constructor(protected _audioService: AudioService,
              private _playlistService: PlaylistService,
              private _userService: UserService,
              private _dialog: MatDialog,
              protected _queueService: QueueService,
              private _cdr: ChangeDetectorRef) {
  }
  deletePlaylist(playlist: Playlist) {
    this._dialog.open(ConfirmPlaylistDeleteDialogComponent, {
      data: playlist
    }).afterClosed().subscribe({
      next: (response: ResponseAPI<Playlist>) => {
        this._playlistService.filterPlaylists()
      }
    })
  }
  playTracks() {
    this.from = {
      id : this.playlist.id,
      name: this.playlist.title,
      url: '/playlists/' + this.playlist.id
    }
    this._playlistService.getPlaylistTracks(this.playlist.id).subscribe({
      next: (response: ResponseAPI<Playlist>) => {
        console.log(response.data.tracks)
        this._queueService.playAllFromIndex(response.data.tracks, 0, this.from)
        this._cdr.detectChanges()
      }
    })
  }

  pause() {
    this._queueService.currentTrackInfo()!.isBeingPlayed = false
    this._audioService.pause()
  }

  continue() {
    this._audioService.continue()
    this._queueService.currentTrackInfo()!.isBeingPlayed = true
  }

  openUpdateDialog() {
    this._dialog.open(CreatePlaylistDialogComponent, {data: this.playlist})
  }
}
