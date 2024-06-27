import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Playlist} from "../../../playlists/interfaces/playlist";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {Track} from "../../../shared/interfaces/track";
import {DragDropService} from "../../../shared/services/drag-drop.service";
import {QueueService} from "../../../queue/services/queue.service";
import {AudioService} from "../../../audio/audio.service";
import {PlaylistService} from "../../../playlists/services/playlist.service";
import {From} from "../../../shared/interfaces/from";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {
  CreatePlaylistDialogComponent
} from "../../../playlists/create-playlist-dialog/create-playlist-dialog.component";
import {
  ConfirmPlaylistDeleteDialogComponent
} from "../../../playlists/confirm-playlist-delete-dialog/confirm-playlist-delete-dialog.component";
import {ResponseAPI} from "../../../shared/interfaces/response-api";

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
  menuTopLeftPosition =  { x: '0px', y: '0px' };
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;
  @ViewChild('triggerMenu') triggerMenu! : ElementRef
  selectedPlaylist : Playlist | null = null
  constructor(public dragDropService: DragDropService,
              protected _queueService: QueueService,
              private _audioService: AudioService,
              private _playlistService: PlaylistService,
              private _matDialog: MatDialog) {
  }
  playPlaylist(id: string) {
    this.from = {
      id : this.playlist.id,
      name: this.playlist.title,
      url: '/playlists/' + this.playlist.id
    }
    this._playlistService.getPlaylistTracks(id).subscribe({
      next: (response: ResponseAPI<Playlist>) => {
        this._queueService.playAllFromIndex(response.data.tracks, 0, this.from)
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
  openEditDialog(playlist: Playlist) {
    this._matDialog.open(CreatePlaylistDialogComponent, {data: playlist})
  }

  openDeleteDialog(playlist: Playlist) {
    this._matDialog.open(ConfirmPlaylistDeleteDialogComponent, {data: playlist})
  }

  openMenu(event: MouseEvent) {
    event.preventDefault()
    this.selectedPlaylist = this.playlist
    this.menuTopLeftPosition.x = event.clientX + 'px'
    this.menuTopLeftPosition.y = event.clientY + 'px'
    this.matMenuTrigger.openMenu()
  }

  onMenuClosed(menu: MatMenu) {
    this.selectedPlaylist = null
  }
}
