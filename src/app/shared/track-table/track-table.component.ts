import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {Track} from "../interfaces/track";
import {AudioService} from "../../audio/audio.service";
import {From} from "../interfaces/from";
import {UserService} from "../../user/services/user.service";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {SnackbarService} from "../services/snackbar.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {QueueService} from "../../queue/services/queue.service";
import {CdkDragDrop, CdkDragExit, CdkDragStart} from "@angular/cdk/drag-drop";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {DragDropService} from "../services/drag-drop.service";


@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackTableComponent {
  selectedTrack: Track = { } as Track
  @Input('tracks') tracks: Track[] = []
  @Input('from') from: From = {} as From
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger
  playlists: Playlist[] = []
  likedMap: Map<string, Track> = new Map<string, Track>()
  currentTrack : Track = {} as Track
  likedTracks : Track[] = []
  constructor(private _audioService: AudioService,
              private _userService: UserService,
              private _queueService: QueueService,
              private _playlistService: PlaylistService,
              private _snackbarService: SnackbarService,
              private _cdr: ChangeDetectorRef,
              private _dragDropService: DragDropService) {}
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
            playlistToDeleteFrom.tracks
            this._playlistService.totalDuration.update((value) => {
              return value - (Math.floor(track.duration) - Math.floor(track.duration % 1000))
            })
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
    if(this.selectedTracks.size > 0) {
      console.log(this.selectedTracks)
      this.addSelectedTracksToPlaylist(this.selectedTracks)
      return
    }
    const currIndex = event.currentIndex
    const trackToDrop = this.tracks[currIndex]
    console.log(trackToDrop)

    if (event.previousContainer === event.container) {
      let target = (event.event.target as HTMLElement).closest('.row')

      if(target) {
        /*const row = target as HTMLDivElement

        row.addEventListener('mouseenter', () => {
          row.classList.add('hovered-row');
        });

        // Remove the border class when the mouse leaves
        row.addEventListener('mouseleave', () => {
          row.classList.remove('hovered-row');
        });*/
        const id = target.id
        if(id && id.length === 36) {
          this.addTrackToPlaylist(trackToDrop.id, id)
        }
      }
    }
  }


    protected readonly outerWidth = outerWidth;
    menuTopLeftPosition =  { x: '0px', y: '0px' };
    clickedElement : HTMLElement | null = null
    closestRow : HTMLTableRowElement | null = null
  openMenuOnRightClick(event: MouseEvent, track: Track) {
    if(event.button === 2) { // right click, secondary
      this.updateMenu(event, track)
    }
  }

  openMenuOnLeftClick(event: MouseEvent, track: Track) {
      if(event.button === 0) { // left click, main
        this.updateMenu(event, track)
      }

  }
  private updateMenu(event: MouseEvent, track: Track) {
    this.clickedElement = event.target as HTMLElement
    this.closestRow = this.clickedElement.closest('tr')

    if(this.closestRow) {
      this.closestRow.style.background = 'var(--light-black)'
    }
    event.preventDefault()
    this.selectedTrack = track
    this.menuTopLeftPosition.x = event.clientX + 'px'
    this.menuTopLeftPosition.y = event.clientY + 'px'
    this.contextMenuTrigger.openMenu()
    this._cdr.detectChanges();
  }

  onMenuClosed(contextMenu: MatMenu) {
    if(this.closestRow && contextMenu.closed) {
      this.closestRow.style.background = ''
    }
  }
  selectedTracks : Map<string, Track> = new Map<string, Track>()
  tracksToAdd: Track[] = []
  selectTrack(event: MouseEvent, id: string, track: Track) {
      if(event.ctrlKey) {
        if(this.selectedTracks.has(id)) {
          this.selectedTracks.delete(id)
          console.log(this.selectedTracks)
          return
        }
        this.selectedTracks.set(id,track)
        console.log(this.selectedTracks)
        return;
      }
      this.selectedTracks.clear()
  }

  //treba preko servisa
  private addSelectedTracksToPlaylist(tracksMap: Map<string, Track>) {
    tracksMap.forEach((value, key) => {
      this.tracksToAdd.push(value)
    })

    console.log(this.tracksToAdd)
  }

  onDragStarted(event: CdkDragStart) {
    this._dragDropService.dragging = true
  }

  onDragDropped(event: CdkDragDrop<any>) {
    this._dragDropService.dragging = false
  }
}
