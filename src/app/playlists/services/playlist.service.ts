import {ChangeDetectorRef, inject, Injectable, signal} from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {CreatePlaylist} from "../interfaces/create-playlist";
import {Playlist} from "../interfaces/playlist";
import {Track} from "../../shared/interfaces/track";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {BehaviorSubject, Observable} from "rxjs";
import {AddTracksToPlaylistResponse} from "../../shared/interfaces/add-tracks-to-playlist-response";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService{
  private playlistSubject = new BehaviorSubject<Playlist>({} as Playlist)
  public playlist$ = this.playlistSubject.asObservable()

  private playlistsSubject = new BehaviorSubject<Playlist[]>([])
  public playlists$ = this.playlistsSubject.asObservable()

  private tracksSubject = new BehaviorSubject<Track[]>([])
  public tracks$ = this.tracksSubject.asObservable()

  private tracks: Track[] = []
  playlist: Playlist = {} as Playlist
  totalDuration = signal<number>(0)
  trackCount = signal<number>(0)
  page = 1
  #snackbar = inject(SnackbarService)
  updatePlaylistsSubject(playlists: Playlist[]) {
    this.playlistsSubject.next(playlists)
  }
  updatePlaylistTracksSubject(tracks: Track[]) {
    this.tracksSubject.next(tracks)
  }
  createPlaylist(playlistToCreate: FormData) {
    return this.post<FormData, null>('playlists', playlistToCreate)
  }

  showPlaylist(id: string) {
    return this.get<ResponseAPI<Playlist>>(`playlists/${id}`)
  }

  addTrackToPlaylist(trackId: string, playlistId: string) {
    return this.post(`playlists/${playlistId}/add-tracks`, {tracks: [trackId]})
  }

  removeTrackFromPlaylist(track: Track, playlistId: string) {
    return this.delete(`playlists/${playlistId}/track/${track.id}/delete/${track.pivot?.id}`).subscribe({
      next: (response: any) => {
        if (response == null){
          const playlistToDeleteFrom = this.playlistsSubject.value.find(pl => pl.id == playlistId)
          if(playlistToDeleteFrom) {
            let without = this.tracksSubject.value.filter(tr => tr.pivot?.id !== track.pivot?.id)
            this.tracksSubject.next(without)
            playlistToDeleteFrom.tracks_count--
            this.trackCount.update(value => {
              return value - 1
            })
            this.totalDuration.update((value) => {
              return value - (Math.floor(track.duration) - Math.floor(track.duration % 1000))
            })
          }
          this.#snackbar.showSuccessMessage('Removed track from playlist.')
        }
      },
      error: (response) => {
        this.#snackbar.showFailedMessage(response.error.message)
      }
    })
  }

  deletePlaylist(playlist: Playlist) {
    return this.delete(`playlists/${playlist.id}/delete`).subscribe({
      next: (response) => {
        let without = this.playlistsSubject.value.filter(p => p.id !== playlist.id)
        this.playlistsSubject.next(without)
        this.#snackbar.showDefaultMessage(`Removed '${playlist.title}' from your library`)
      },
      error: (err) => {
        this.#snackbar.showDefaultMessage(err.error.message)
      }
    })
  }

  loadMoreTracks(id: string) {
    return this.get<PagedResponse<Track[]>>(`playlists/${id}/tracks?page=${this.page++}`).subscribe({
      next: (pagedResponse) => {
          this.tracks = [...this.tracks, ...pagedResponse.data]
          this.tracksSubject.next(this.tracks)
      }
    })
  }

  addTracksToPlaylist(tracksToAdd: string[], playlistId: string, confirm?: boolean): Observable<AddTracksToPlaylistResponse> {
    return this.post(`playlists/${playlistId}/tracks/add`, {tracks: tracksToAdd, confirm: confirm})
  }

  addAllTracksToPlaylistConfirm(id: string, tracks?: Track[]) {
    return
  }

  getPlaylists() {
    return this.get<ResponseAPI<Playlist[]>>('playlists').subscribe({
      next: (response) => {
        this.updatePlaylistsSubject(response.data)
      }
    })
  }

  getPlaylistTracks(id: string) {
    return this.get(`playlists/${id}/tracks`)
  }
}
