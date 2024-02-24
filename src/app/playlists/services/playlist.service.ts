import {ChangeDetectorRef, computed, inject, Injectable, signal} from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {CreatePlaylist} from "../interfaces/create-playlist";
import {Playlist} from "../interfaces/playlist";
import {Track} from "../../shared/interfaces/track";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {BehaviorSubject, Observable} from "rxjs";
import {
  AddTracksToPlaylistResponse,
  SuccessTracksToPlaylistResponse
} from "../../shared/interfaces/add-tracks-to-playlist-response";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {TrackDurationService} from "../../shared/services/track-duration.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService{
  public playlists = signal<Playlist[]>([])
  public tracks = signal<Track[]>([])
  playlist: Playlist = {} as Playlist
  totalDuration = signal<number>(0)
  trackCount = signal<number>(0)
  #snackbar = inject(SnackbarService)
  #trackDurationService = inject(TrackDurationService)
  public filtered: Playlist[] = []
  public query: string = ''


  createPlaylist(playlistToCreate: FormData) {
    return this.post<FormData, ResponseAPI<Playlist>>('playlists', playlistToCreate)
  }

  showPlaylist(id: string) {
    return this.get<ResponseAPI<Playlist>>(`playlists/${id}`)
  }

  addTrackToPlaylist(trackId: string, playlistId: string) {
    return this.post(`playlists/${playlistId}/add-tracks`, {tracks: [trackId]})
  }

  removeTrackFromPlaylist(track: Track, playlistId: string) {
    return this.delete(`playlists/${playlistId}/tracks/${track.pivot?.id}`).subscribe({
      next: (response: any) => {
        if (response == null){
          this.playlists.update(playlists => {
            let playlistToUpdate = playlists.find(p => p.id == playlistId)
            if (playlistToUpdate) {
              let without = this.tracks().filter(tr => tr.pivot?.id !== track.pivot?.id)
              this.tracks.set(without)
              playlistToUpdate.tracks_count--
              this.#trackDurationService.calculateTotalDurationOfTracks(without)
            }
            return playlists
          })
          //const playlistToDeleteFrom = this.playlistsSubject.value.find(pl => pl.id == playlistId)
          /*if(playlistToDeleteFrom) {
            let without = this.tracksSubject.value.filter(tr => tr.pivot?.id !== track.pivot?.id)
            this.tracksSubject.next(without)
            playlistToDeleteFrom.tracks_count--
            this.trackCount.update(value => {
              return value - 1
            })
            this.#trackDurationService.calculateTotalDurationOfTracks(without)
            // this.totalDuration.update((value) => {
            //   return value - (Math.floor(track.duration) - Math.floor(track.duration % 1000))
            // })
          }*/
          this.#snackbar.showDefaultMessage('Removed track from playlist.')
        }
      },
      error: (response) => {
        this.#snackbar.showFailedMessage(response.error.message)
      }
    })
  }

  deletePlaylist(playlist: Playlist) {
    return this.delete(`playlists/${playlist.id}`)
  }

  addTracksToPlaylist(tracksToAdd: string[], playlistId: string, confirm?: boolean): Observable<ResponseAPI<SuccessTracksToPlaylistResponse>> {
    return this.post(`playlists/${playlistId}/tracks`, {tracks: tracksToAdd, confirm: confirm})
  }

  getPlaylists() {
    return this.get<ResponseAPI<Playlist[]>>('playlists').subscribe({
      next: (response) => {
        this.playlists.set(response.data)
        this.filterPlaylists()
      }
    })
  }

  getPlaylistTracks(id: string) {
    return this.get<ResponseAPI<Playlist>>(`playlists/${id}`)
  }

  updatePlaylist(id: string, playlist: FormData) {
    return this.post<FormData,ResponseAPI<Playlist>>(`playlists/${id}?_method=patch`, playlist)
  }

  filterPlaylists() {
    this.filtered = []
    if (this.query.length > 0) {
      this.filtered = this.playlists().filter(playlist => playlist.title.toLowerCase().trim().includes(this.query.toLowerCase().trim()))
    }
  }
}
