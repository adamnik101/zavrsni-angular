import {Injectable, signal} from '@angular/core';
import {User} from "../interfaces/user";
import {BaseService} from "../../core/services/base.service";
import {BehaviorSubject, config, Observable, Subscription} from "rxjs";
import {EventType, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../../config/config.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Track} from "../../shared/interfaces/track";
import {Artist} from "../../artists/interfaces/artist";
import {AuthService} from "../../auth/services/auth.service";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {Settings} from "../../settings/interfaces/settings";
import {Album} from "../../albums/interfaces/album";
import {LoaderService} from "../../core/services/loader.service";
import {TrackLikeService} from "../../shared/services/track-like.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  plaldsada: Playlist[] = []
  userLoaded = signal<boolean | null>(null)
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
  constructor(private http: HttpClient,
              private config: ConfigService,
              private _loaderService: LoaderService,
              private _router: Router, private _authService: AuthService,
              private likeService: TrackLikeService) {
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
    this._loaderService.showLoader()
    const subscribe: Subscription = this.get<ResponseAPI<User>>('auth/me').subscribe({
      next: (response: ResponseAPI<User>): void => {
        console.log(response)
        const user = response.data
        this.setUserSubject(user)
        this._likedAlbumSubject.next(user.liked_albums)
        this._playlistsSubject.next(user.playlists)
        this._likedTracksSubject.next(user.liked_tracks)

        this._followingSubject.next(user.followings)
        this._settingsSubject.next(user.settings)
        this._authService.isLoggedIn = true
        this.likedTracks.set(user.liked_tracks)
        this.userLoaded.set(true)
        this.settings.set(user.settings)

        this.likeService.setInitialLikedTracks(user.liked_tracks)

        if(navigateToProfile) this._router.navigate(['user/profile'])

      },
      error: (response):void => {
        // if (response.status === 401) {
        //   this._authService.isLoggedIn = false
        //   this._router.navigate(['auth/login'])
        // }
        console.log(response.error.message)
      },
      complete: () :void => {
        this._loaderService.hideLoader()
        console.log(subscribe)
        subscribe.unsubscribe()
      }
    })
  }
  unsetAllUserRelevantSubjects() {
    this.setUserSubject(null)
    this._likedAlbumSubject.next([])
    this._playlistsSubject.next([])
    this._likedTracksSubject.next([])
    this._followingSubject.next([])
    this._settingsSubject.next({} as Settings)
  }
  getUserPlaylists() {
    return this.get<Playlist[]>('actor/playlists').subscribe({
      next: (playlists) => {
        this._playlistsSubject.next(playlists)
      }
    })
  }
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

  getRecentlyPlayedTracks() {
    return this.get<ResponseAPI<Track[]>>('me/recently-played')
  }

  updateSettings(value: any, setting: string) {
    return this.post<{value: boolean, setting: string}, ResponseAPI<Settings>>('me/settings', {value,setting})
  }
}
