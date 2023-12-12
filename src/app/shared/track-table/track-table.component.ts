import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Track} from "../interfaces/track";
import {AudioService} from "../../audio/audio.service";
import {From} from "../interfaces/from";
import {UserService} from "../../user/services/user.service";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {SnackbarService} from "../services/snackbar.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {QueueService} from "../../queue/services/queue.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackTableComponent {
  @Input('tracks') tracks: Track[] = []
  @Input('from') from: From = {} as From

  playlists: Playlist[] = []
  likedMap: Map<string, Track> = new Map<string, Track>()
  currentTrack : Track = {} as Track
  likedTracks : Track[] = []
  constructor(private _audioService: AudioService,
              private _userService: UserService,
              private _queueService: QueueService,
              private _playlistService: PlaylistService,
              private _snackbarService: SnackbarService,
              private _cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this._userService.playlists$.subscribe({
      next: (playlists) => {
        this.playlists = playlists
      }
    })

    this.likedTracks = this._userService.likedTracks()
    for (let track of this.likedTracks) {
      this.likedMap.set(track.id, track)
    }
    /*this._userService.likedTracks$.subscribe({
      next: (tracks) => {
        for (let track of tracks) {
          this.likedMap.set(track.id, track)
        }
      }
    })*/

    this.currentTrack = this._audioService.currentTrack()
  }
  trackById(index: number, item: any) {
    return item.id
  }
  play(track: Track) {
    /*this.currentTrack = track
    this._audioService.playTrack(this.currentTrack, this.from)*/
    this._queueService.addTrack(track, this.from)
    //this._audioService.playTrack(track, this.from)
    console.log(this._queueService.queue)
  }
  playAllFromIndex(tracks: Track[], index: number, from: From) {
    this._queueService.currentQueueIndex = index
    this._queueService.addTracks(tracks, from)
    this._queueService.playAtIndex(this._queueService.currentQueueIndex)
    //this._audioService.playTrack(this._queueService.queue[this._queueService.currentQueueIndex], from)
  }
  addTrackToPlaylist(trackId: string, playlistId: string) {
    const sub = this._playlistService.addTrackToPlaylist(trackId, playlistId).subscribe({
      next: (response: any) => {
        this._snackbarService.showSuccessMessage(response.message)
        const playlist = this.playlists.find(playlist => playlist.id === playlistId)
        if(playlist) {
          playlist.tracks_count++
          this._cdr.markForCheck()
        }
      },
      error: (err) => {
        console.log(err)
        this._snackbarService.showFailedMessage(err.error.message)
      },
      complete() {
        sub.unsubscribe()
      }
    })
  }

  likeTrack(track: Track) {
    const sub = this._userService.likeTrack(track.id).subscribe({
      next: (response: any) => {
        this._snackbarService.showSuccessMessage(response.message)
        this.likedMap.set(track.id, track)
        //this._userService.getUserLikedTracks(1, 10)
        this._cdr.markForCheck()
      },
      error: (response: any) => {
        this._snackbarService.showFailedMessage(response.error.message)
      },
      complete() {
        sub.unsubscribe()
      }
    })
  }

  removeFromLiked(track: string) {
    const sub = this._userService.removeFromLiked(track).subscribe({
      next: (response) => {
        console.log(response)
        this._snackbarService.showSuccessMessage('Successfully removed track from liked.')
        this.likedMap.delete(track)
        let tracks = []
        for (let track of this.likedMap.values()){
          tracks.push(track)
        }
        this.likedTracks = tracks
        this._userService.updateLikedTracks(tracks)
        this._cdr.markForCheck()
      },
      error: (response) => {
        this._snackbarService.showFailedMessage(response.error.message)
      },
      complete () {
        sub.unsubscribe()
      }
    })
  }
  get playlist() {
    return this._playlistService.playlist
  }
  removeFromPlaylist(track: Track, from: From) {
    const sub = this._playlistService.removeTrackFromPlaylist(track, from.id).subscribe({
      next: (response: any) => {
        if (response == null){
          this.removeTrack(track, from)
          const playlistToDeleteFrom = this.playlists.find(pl => pl.id == from.id)
          if(playlistToDeleteFrom) {
            playlistToDeleteFrom.tracks_count--
          }
          this._snackbarService.showSuccessMessage('Removed track from playlist.')
          this._cdr.markForCheck()
        }
      },
      error: (response) => {
        this._snackbarService.showFailedMessage(response.error.message)
      },
      complete() {
        sub.unsubscribe()
      }
    })
  }
  private removeTrack(track: Track, from: From){
    let trackToDelete = this.playlist.tracks.data.findIndex(t => t.id === track.id)
    if(trackToDelete != -1) {
      this.playlist.tracks.data.splice(trackToDelete, 1)
      this.playlist.tracks_count--
      const updateSidenavPlaylist = this._userService.plaldsada.find(p => p.id == from.id)
      if(updateSidenavPlaylist) {
        updateSidenavPlaylist.tracks_count--
      }
    }
  }

  addToQueue(track: Track) {
    this._queueService.addTrack(track, this.from)
  }

  drop(event: CdkDragDrop<any, any>) {
    const currIndex = event.currentIndex
    const trackToDrop = this.tracks[currIndex]
    console.log(trackToDrop)

    if (event.previousContainer === event.container) {
      let target = event.event.target

      if(target) {
        const id = (target as HTMLElement).id
        if(id && id.length === 36) {
          this.addTrackToPlaylist(trackToDrop.id, id)
        }
      }
    }
  }
}
