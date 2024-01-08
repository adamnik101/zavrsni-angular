import {Component, Input} from '@angular/core';
import {Playlist} from "../../../playlists/interfaces/playlist";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {Track} from "../../../shared/interfaces/track";
import {DragDropService} from "../../../shared/services/drag-drop.service";
import {QueueService} from "../../../queue/services/queue.service";
import {AudioService} from "../../../audio/audio.service";
import {PlaylistService} from "../../../playlists/services/playlist.service";
import {From} from "../../../shared/interfaces/from";

@Component({
  selector: 'app-user-playlist-list',
  templateUrl: './user-playlist-list.component.html',
  styleUrls: ['./user-playlist-list.component.scss']
})
export class UserPlaylistListComponent {
  @Input('playlist') playlist : Playlist = {} as Playlist
  shouldAddBorder : boolean = false
  track: Track = {} as Track;
  from: From = {} as From
  constructor(public dragDropService: DragDropService,
              protected _queueService: QueueService,
              private _audioService: AudioService,
              private _playlistService: PlaylistService) {
  }
  playPlaylist(id: string) {
    this.from = {
      id : this.playlist.id,
      name: this.playlist.title,
      url: '/playlists/' + this.playlist.id
    }
    this._playlistService.getPlaylistTracks(id).subscribe({
      next: (response: any) => {
        this._queueService.playAllFromIndex(response.tracks, 0, this.from)
      }
    })
  }

  dropped(id: string, $event: CdkDragDrop<any, any>) {
    console.log(id)
  }

  setBorder() {
    if(this.dragDropService.dragging) {
      this.shouldAddBorder = true
    }
  }

  removeBorder() {
    this.shouldAddBorder = false
  }

  pause() {
    if(this._queueService.currentTrackInfo()) {
      this._audioService.pause()
      this._queueService.currentTrackInfo()!.isBeingPlayed = false
    }
  }

  continue() {
    if(this._queueService.currentTrackInfo()) {
      this._audioService.continue()
      this._queueService.currentTrackInfo()!.isBeingPlayed = true
    }
  }
}
