import {Injectable, signal} from '@angular/core';
import {User} from "../interfaces/user";
import {BaseService} from "../../core/services/base.service";
import {BehaviorSubject, config, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../config/config.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Track} from "../../shared/interfaces/track";
import {Artist} from "../../artists/interfaces/artist";
import {AuthService} from "../../auth/services/auth.service";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {Settings} from "../../settings/interfaces/settings";
import {Album} from "../../albums/interfaces/album";


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  plaldsada: Playlist[] = []
  userLoaded = signal<boolean>(false)
  likedTracks = signal<Track[]>([])
  private _userSubject : BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public user$ = this._userSubject.asObservable()

  private _settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({} as Settings)
  public settings$ = this._settingsSubject.asObservable()

  private _playlistsSubject: BehaviorSubject<Playlist[]> = new BehaviorSubject<Playlist[]>([])
  public playlists$ = this._playlistsSubject.asObservable()

  private _likedTracksSubject: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([])
  public likedTracks$ = this._likedTracksSubject.asObservable()
  public likedTracksTotal : number = 0

  private _followingSubject: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>([])
  public following$ = this._followingSubject.asObservable()

  private _likedAlbumSubject: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([])
  public likedAlbums$ = this._likedAlbumSubject.asObservable()

  private _playlistTracks : Map<Playlist, Track[]> = new Map<Playlist, Track[]>()
  public following : Artist[] = []
  settings = signal<Settings>({} as Settings);
  constructor(private http: HttpClient, private config: ConfigService, private _router: Router, private _authService: AuthService) {
    super(http, config);
  }
  public updateLikedTracks(tracks :Track[]) {
    this._likedTracksSubject.next(tracks)
  }
  public deleteUserPlaylist(playlist: Playlist) {
    let newUserPlaylists = this._playlistsSubject.value.filter(pl => pl.id !== playlist.id)
    this.user$.subscribe({
      next: (user) => {
        if(user) {
          user.playlists_count--
        }
      }
    })
    this._playlistsSubject.next(newUserPlaylists)
  }
  setUserSubject(user: User | null) {
    this._userSubject.next(user)
  }
  getUser(navigateToProfile = false) {
    const subscribe: Subscription = this.get<User>('actor').subscribe({
      next: (user: User): void => {
        this.setUserSubject(user)
        this._likedAlbumSubject.next(user.liked_albums)
        this._playlistsSubject.next(user.playlists)
        this._likedTracksSubject.next(user.liked_tracks)
        this._followingSubject.next(user.following)
        this._settingsSubject.next(user.settings)
        this._authService.isLoggedIn = true
        this.likedTracks.set(user.liked_tracks)
        this.userLoaded.set(true)
        this.settings.set(user.settings)
        if(navigateToProfile) this._router.navigate(['user/profile'])
      },
      error: (response):void => {
        // if (response.status === 401) {
        //   this._authService.isLoggedIn = false
        //   this._router.navigate(['auth/login'])
        // }
        console.log(response.error.message)
      },
      complete () :void {
        subscribe.unsubscribe()
      }
    })
  }
  getUserPlaylists() {
    return this.get<Playlist[]>('actor/playlists').subscribe({
      next: (playlists) => {
        this._playlistsSubject.next(playlists)
      }
    })
  }
  getUserLikedTracks(page: number, size: number) {
    return this.get<Track[]>(`actor/liked`)
  }

  likeTrack(trackId: string) {
    return this.post('actor/like', {track: trackId})
  }

  removeFromLiked(track: string) {
    return this.delete(`actor/liked/${track}/remove`)
  }

  followArtist(artist: Artist) {
    return this.post(`actor/artists/${artist.id}/follow`, null)
  }

  unfollowArtist(artist: Artist) {
    return this.delete(`actor/artists/${artist.id}/unfollow`)
  }

  updateFollowing(newFollowing: Artist[]) {
    this._followingSubject.next(newFollowing)
  }
  updateLikedAlbums(albums: Album[]) {
    this._likedAlbumSubject.next(albums)
  }
  updateUserSettings(settings: Settings) {
    this._settingsSubject.next(settings)
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

  getRecentlyPlayedTracks() : Observable<Track[]> {
    return this.get<Track[]>('actor/recent/tracks')
  }

  updateSettings(value: any, setting: string) {
    return this.post<{value: boolean, setting: string}, Settings>('actor/settings/update', {value,setting})
  }
}
