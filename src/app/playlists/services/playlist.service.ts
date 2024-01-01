import {Injectable, signal} from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {CreatePlaylist} from "../interfaces/create-playlist";
import {Playlist} from "../interfaces/playlist";
import {Track} from "../../shared/interfaces/track";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {BehaviorSubject, Observable} from "rxjs";
import {AddTracksToPlaylistResponse} from "../../shared/interfaces/add-tracks-to-playlist-response";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService{
  private playlistSubject = new BehaviorSubject<Playlist>({} as Playlist)
  public playlist$ = this.playlistSubject.asObservable()

  private tracksSubject = new BehaviorSubject<Track[]>([])
  public tracks$ = this.tracksSubject.asObservable()
  private tracks: Track[] = []
  playlist: Playlist = {} as Playlist
  totalDuration = signal<number>(0)
  page = 1
  createPlaylist(playlistToCreate: FormData) {

    return this.post<FormData, null>('playlists', playlistToCreate)
  }

  showPlaylist(id: string) {
    return this.get<Playlist>(`playlists/${id}`)
  }

  addTrackToPlaylist(trackId: string, playlistId: string) {
    return this.post(`playlists/${playlistId}/add-tracks`, {tracks: [trackId]})
  }

  removeTrackFromPlaylist(track: Track, playlistId: string) {
    return this.delete(`playlists/${playlistId}/track/${track.id}/delete`)
  }

  deletePlaylist(playlist: Playlist) {
    return this.delete(`playlists/${playlist.id}/delete`)
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
}
