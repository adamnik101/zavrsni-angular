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
    private _titleService: Title
  ) {}

  ngOnInit() {
    this._titleService.setTitle('Home - TREBLE');
    this.subs.push(this._albumService.getNewReleases().subscribe({
      next: (responseAPI) => {
        this.albums = responseAPI.data
      }
    }))
    this.subs.push(this._trackService.getNewReleases().subscribe({
      next: (responseAPI) => {
        this.newReleasesTracks = responseAPI.data
        this.loading = false
      }
    }))
    this._userService.user$.subscribe({
      next: (user) => {

      }
    })


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
      this.subs.push(this._userService.getRecentlyPlayedTracks().subscribe({
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
