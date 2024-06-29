import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/artists/interfaces/artist';
import { ConfigService } from 'src/app/config/config.service';
import { BaseService } from 'src/app/core/services/base.service';
import { Settings } from 'src/app/settings/interfaces/settings';
import { ResponseAPI } from 'src/app/shared/interfaces/response-api';
import { Track } from 'src/app/shared/interfaces/track';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserRequestsService extends BaseService{

  constructor(private http: HttpClient, private configService: ConfigService) {
    super(http, configService);
  }
  
  // getUserPlaylists() {
  //   return this.get<Playlist[]>('actor/playlists').subscribe({
  //     next: (playlists) => {
  //       this._playlistsSubject.next(playlists)
  //     }
  //   })
  // }

  getUserLikedTracks(page: number, size: number) {
    return this.get<ResponseAPI<Track[]>>(`me/tracks`)
  }

  likeTrack(trackId: string) {
    return this.post('me/tracks', {uuid: trackId})
  }

  removeFromLiked(track: string) {
    return this.delete(`me/tracks/${track}`)
  }

  followArtist(artist: Artist): Observable<ResponseAPI<string>> {
    return this.post(`me/artists/`, {uuid : artist.id})
  }

  unfollowArtist(artist: Artist) {
    return this.delete(`me/artists/${artist.id}`)
  }

  getRecommendedArtists() {
    return this.get<Artist[]>('actor/recommend/artists')
  }

  getRecommendedTracks() {
    return this.get<Track[]>('actor/recommend/tracks')
  }

  getFavoriteTracksInLast7Days() {
    return this.get<Track[]>('actor/favorite/tracks')
  }

  getRecentlyPlayedTracks() {
    return this.get<ResponseAPI<Track[]>>('me/recently-played')
  }

  updateSettings(value: any, setting: string) {
    return this.post<{value: boolean, setting: string}, ResponseAPI<Settings>>('me/settings', {value,setting})
  }

  updateUsername(username: string) {
    return this.patch<{ username: string },ResponseAPI<User>>('me/username', {username: username})
  }

  updateCover(selectedFile: any) {
    const formData = new FormData()
    formData.append('image', selectedFile)

    return this.post<any, ResponseAPI<any>>('me/cover', formData)
  }
}
