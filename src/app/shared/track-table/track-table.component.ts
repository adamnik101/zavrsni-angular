import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, signal, ViewChild} from '@angular/core';
import {Track} from "../interfaces/track";
import {AudioService} from "../../audio/audio.service";
import {From} from "../interfaces/from";
import {UserService} from "../../user/services/user.service";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {SnackbarService} from "../services/snackbar.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {QueueService} from "../../queue/services/queue.service";
import {CdkDragDrop, CdkDragExit, CdkDragMove, CdkDragStart} from "@angular/cdk/drag-drop";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {DragDropService} from "../services/drag-drop.service";
import {
  AddTracksToPlaylistResponse,
  ErrorTracksToPlaylistResponse, SuccessTracksToPlaylistResponse
} from "../interfaces/add-tracks-to-playlist-response";
import {MatDialog} from "@angular/material/dialog";
import {
  AddTracksToPlaylistDialogComponent
} from "../../playlists/add-tracks-to-playlist-dialog/add-tracks-to-playlist-dialog.component";
import {Subscription} from "rxjs";
import {CurrentTrackInfo} from "../interfaces/current-track-info";
import {LoaderService} from "../../core/services/loader.service";
import {User} from "../../user/interfaces/user";
import {TrackLikeService} from "../services/track-like.service";
import {TrackDurationService} from "../services/track-duration.service";
import {ResponseAPI} from "../interfaces/response-api";
import {CreatePlaylistDialogComponent} from "../../playlists/create-playlist-dialog/create-playlist-dialog.component";
import { UserRequestsService } from 'src/app/user/services/requests/user-requests.service';


@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TrackTableComponent {
  isCurrentT = signal<boolean>(false)
  selectedTrack: Track = { } as Track
  @Input('tracks') tracks: Track[] = []
  @Input('from') from: From = {} as From
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger
  playlists: Playlist[] = []
  likedMap: Map<string, Track> = new Map<string, Track>()
  currentTrack : Track = {} as Track
  likedTracks : Track[] = []
  dropToPlaylistId: string = ''
  private subs: Subscription[] = []
  user: User = { } as User
  searching: boolean = false
  filteredPlaylists: Playlist[] = []
  searchQuery: string = ''
  
  @Output() onTrackPlayed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onTrackLike: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(protected _audioService: AudioService,
              protected _userService: UserService,
              protected _queueService: QueueService,
              protected _playlistService: PlaylistService,
              private _snackbarService: SnackbarService,
              private _cdr: ChangeDetectorRef,
              private _dragDropService: DragDropService,
              private _matDialog: MatDialog,
              protected trackLikeService: TrackLikeService,
              private _trackDurationService: TrackDurationService,
              private userRequests: UserRequestsService) {
  }
  ngOnInit() {

    // this.likedTracks = this._userService.likedTracks()
    // for (let track of this.likedTracks) {
    //   this.likedMap.set(track.id, track)
    // }
    // this._userService.likedTracks$.subscribe({
    //   next: (tracks) => {
    //     for (let track of tracks) {
    //       this.likedMap.set(track.id, track)
    //     }
    //   }
    // })

    this.currentTrack = this._audioService.currentTrack()

  }

  playAllFromIndex(tracks: Track[], index: number, from: From) {
    if(this._userService.userLoaded()) {
      this._queueService.playAllFromIndex(tracks, index, from)
    }
    else {
      this._queueService.playAllFromIndexWithNoUser(tracks, index, from)
    }
  }

  addTrackToPlaylist(playlistId: string, trackId?: string) {
    if(!trackId) {
      trackId = this.selectedTrack.id
    }
    this.subs.push(this._playlistService.addTracksToPlaylist([trackId], playlistId).subscribe({
      next: (response: ResponseAPI<SuccessTracksToPlaylistResponse>) => {
        this._snackbarService.showDefaultMessage(response.data.message)
        const playlist = this._playlistService.playlists().find(playlist => playlist.id === playlistId)
        if(playlist) {
          //this._playlistService.trackCount.update(value => value + Number(1))
          playlist.tracks_count++
          this._cdr.markForCheck()
        }
      },
      error: (err) => {
        console.log(err)
        this._matDialog.open(AddTracksToPlaylistDialogComponent, {data: err.error.errors as ErrorTracksToPlaylistResponse})
      }
    }))
  }

  likeTrack(track: Track) {
    this.trackLikeService.addTrackToLiked(track)
    this.onTrackLike.emit(true);
    this.subs.push(this.userRequests.likeTrack(track.id).subscribe({
      next: (response: any) => {
        this._snackbarService.showDefaultMessage(response.message)
        this.likedMap.set(track.id, track)
        //this._userService.getUserLikedTracks(1, 10)
        this._cdr.detectChanges()
      },
      error: (response: any) => {
        this._snackbarService.showFailedMessage(response.error.message)
      }
    }))
  }

  removeFromLiked(track: string) {
    this.trackLikeService.deleteTrackFromLiked(track)
    this.onTrackLike.emit(false);
    this.subs.push(this.userRequests.removeFromLiked(track).subscribe({
      next: (response) => {
        console.log(response)
        this._snackbarService.showDefaultMessage('Removed from liked.')
        this.likedMap.delete(track)
        let tracks = []
        for (let track of this.likedMap.values()){
          tracks.push(track)
        }
        this.likedTracks = tracks
        this._userService.updateLikedTracks(tracks)
        if(this.from.url.includes('/liked')) {
          this._trackDurationService.calculateTotalDurationOfTracks(this.trackLikeService.getLikedTracks())
        }
        this._cdr.markForCheck()
      },
      error: (response) => {
        this._snackbarService.showFailedMessage(response.error.message)
      }
    }))
  }

  get playlist() {
    return this._playlistService.playlist
  }

  removeFromPlaylist(track: Track, from: From) {
    this._playlistService.removeTrackFromPlaylist(track, from.id)
  }

  addToQueue(track: Track) {
    this._queueService.addTrack(track, this.from)
  }

  drop(event: CdkDragDrop<any, any>) {
    if(event.previousContainer === event.container) {
      let target = (event.event.target as HTMLElement).closest('.row')

      if(target) {
        this.dropToPlaylistId = target.id
        if(this.dropToPlaylistId.length === 36 && this.dropToPlaylistId) {
          console.log(this.dropToPlaylistId)

          if(this.selectedTracks.size > 0) {
            console.log(this.selectedTracks)
            this.addSelectedTracksToPlaylist(this.selectedTracks, this.dropToPlaylistId)
            return
          }

          const currIndex = event.currentIndex
          const trackToDrop = this.tracks[currIndex]

          this.addTrackToPlaylist(this.dropToPlaylistId, trackToDrop.id)
        }
      }
    }
  }


    protected readonly outerWidth = outerWidth;
    menuTopLeftPosition =  { x: '0px', y: '0px' };
    clickedElement : HTMLElement | null = null
    closestRow : HTMLTableRowElement | null = null
  openMenuOnRightClick(event: MouseEvent, track: Track) {
      if(this.selectedTracks.size > 1 && event.button === 2) {
        console.log('multiple')
      }
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
      this.searchQuery = ''
    this.searching = false
    if(this.closestRow && contextMenu.closed) {
      this.closestRow.style.background = ''
    }
  }
  selectedTracks : Map<number, Track> = new Map<number, Track>()
  tracksToAdd: string[] = []

  selectTrack(event: MouseEvent, index: number, track: Track) {
      if(this._userService.userLoaded()) {
        if(event.ctrlKey) {
          if(this.selectedTracks.has(index)) {
            this.selectedTracks.delete(index)
            console.log(this.selectedTracks)
            return
          }
          this.selectedTracks.set(index,track)
          console.log(this.selectedTracks)
          return;
        }
        this.selectedTracks.clear()
        this.tracksToAdd = []
      }
  }

  //treba preko servisa
  private addSelectedTracksToPlaylist(tracksMap: Map<number, Track>, playlistId: string) {
    tracksMap.forEach((value, key) => {
      this.tracksToAdd.push(value.id)
    })
    this.subs.push(this._playlistService.addTracksToPlaylist(this.tracksToAdd, playlistId).subscribe({
      next: (response: ResponseAPI<SuccessTracksToPlaylistResponse>) => {
        console.log(response)
        const playlist = this._playlistService.playlists().find(p => p.id === playlistId)
        if(playlist) {
          //this._playlistService.trackCount.update(value => value + Number(response.data.added_count))
          playlist.tracks_count = Number(playlist.tracks_count) + Number(response.data.added_count)
          this._cdr.markForCheck()
          this._snackbarService.showDefaultMessage(response.data.message)
          this._matDialog.closeAll()
          this.selectedTracks.clear()
          this.tracksToAdd = []
        }
      },
      error: (response) => {
        console.log(response)
        this._matDialog.open(AddTracksToPlaylistDialogComponent, {data: response.error.errors as ErrorTracksToPlaylistResponse})
      }
    }))
    this.tracksToAdd = []
  }

  onDragStarted(event: CdkDragStart) {
    this._dragDropService.dragging = true
  }

  onDragDropped(event: CdkDragDrop<any>) {
    this._dragDropService.dragging = false
  }
  ngOnDestroy() {
      console.log('destroyed table')
    for (let sub of this.subs) {
      sub.unsubscribe()
    }
  }

  pause() {
    this._queueService.currentTrackInfo.update((tr) => {
      tr!.isBeingPlayed = false
      return tr
    })
    this._audioService.pause()
    this._cdr.markForCheck()
  }

  updateQueueIndex(index: number) {
    this._queueService.currentQueueIndex = index
    this._queueService.playAtIndex(this._queueService.currentQueueIndex)
  }

  continue() {
    this._queueService.currentTrackInfo.update((tr) => {
      tr!.isBeingPlayed = true
      return tr
    })
    this._audioService.continue()
    this._cdr.markForCheck()
  }
  isCurrentTrack(track: Track, index: number, from : From): boolean {
      console.log('isCurrentTrack')
      return this._queueService.currentTrackInfo()?.track === track.id && index === this._queueService.currentTrackInfo()?.index && from.id === this._queueService.currentTrackInfo()?.from
  }

  isFromSameSection(from: From) {
      if(this._queueService.currentTrackInfo() !== null ) {
        return from.id === this._queueService.currentTrackInfo()!.from
      }
      return false
  }

  playAllFromIndexWithNoUser(tracks: Track[], index: number, from: From) {
    this._queueService.playAllFromIndexWithNoUser(tracks, index, from)
  }

  openCreatePlaylistDialog() {
    this._matDialog.open(CreatePlaylistDialogComponent)
  }
  searchPlaylists() {
      this.searching = this.searchQuery.length !== 0;
    this.filteredPlaylists = []
    this.filteredPlaylists = this._playlistService.playlists().filter(p => p.title.trim().toLowerCase().includes(this.searchQuery.trim().toLowerCase()))
    }
}
