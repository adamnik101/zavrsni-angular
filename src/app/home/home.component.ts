import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumService } from '../albums/services/album.service';
import { Album } from '../albums/interfaces/album';
import { UserService } from '../user/services/user.service';
import { Artist } from '../artists/interfaces/artist';
import { Track } from '../shared/interfaces/track';
import { From } from '../shared/interfaces/from';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {TrackService} from "../tracks/services/track.service";
import { UserRequestsService } from '../user/services/requests/user-requests.service';
import { TokenService } from '../auth/services/token.service';
import { HomeRequestsService } from './services/requests/home-requests.service';
import { HomepageData } from './interfaces/homepage-data';
import { SpinnerFunctions } from '../core/static-functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  recommendedArtists: Artist[] = [];
  recommendedTracks: Track[] = [];
  recentTracks: Track[] = [];
  newReleasesTracks: Track[] = []
  from: From = {
    id: '',
    url: '/',
    name: 'Home',
  };
  subs: Subscription[] = []
  public loading: boolean = true;
  public loadedRecently: boolean = false
  constructor(
    private _albumService: AlbumService,
    private _trackService: TrackService,
    private _userService: UserService,
    private _titleService: Title,
    private _userRequests: UserRequestsService,
    private tokenService: TokenService,
    private homeRequests: HomeRequestsService
  ) {}

  ngOnInit() {
    this._titleService.setTitle('Home - TREBLE');
    const hasToken = !!this.tokenService.getToken();
    SpinnerFunctions.showSpinner();
    this.homeRequests.getAllDataForHomePage(hasToken).subscribe({
      next: (response: HomepageData) => {
        console.log(response)
        this.albums = response.albums.data;
        this.newReleasesTracks = response.tracks.data;
        if(hasToken && response.recent) {
          this.recentTracks = response.recent.data;
          this.loadedRecently = true;
        }

        SpinnerFunctions.hideSpinner();
      }
    })
    // this.subs.push(this._albumService.getNewReleases().subscribe({
    //   next: (responseAPI) => {
    //     this.albums = responseAPI.data
    //   }
    // }))
    // this.subs.push(this._trackService.getNewReleases().subscribe({
    //   next: (responseAPI) => {
    //     this.newReleasesTracks = responseAPI.data
    //     this.loading = false
    //   }
    // }))
    // this._userService.user$.subscribe({
    //   next: (user) => {

    //   }
    // })


    // this.loadedRecently = false
    /*this.subs.push(this._userService.getRecentlyPlayedTracks().subscribe({
      next: (tracks) => {
        this.recentTracks = tracks;
        this.loadedRecently = true
      },
    }))
    this.subs.push(this._albumService.getLatest().subscribe({
      next: (response) => {
        this.albums = response;
      },
    }))
    this.subs.push(this._userService.getRecommendedArtists().subscribe({
      next: (artists) => {
        this.recommendedArtists = artists;
      },
    }))
    this.subs.push(this._userService.getRecommendedTracks().subscribe({
      next: (tracks) => {
        this.recommendedTracks = tracks;
        this.loading = false;
      },
    }))*/
  }


  ngAfterViewInit() {
    if (this._userService.userLoaded()) {
      this.subs.push(this._userRequests.getRecentlyPlayedTracks().subscribe({
        next: (tracks) => {
          this.recentTracks = tracks.data;
          this.loadedRecently = true
        },
      }))
    }
  }

  ngOnDestroy() {
    for(let sub of this.subs) {
      sub.unsubscribe()
    }
  }
}
