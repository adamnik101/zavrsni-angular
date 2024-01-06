import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumService } from '../albums/services/album.service';
import { Album } from '../albums/interfaces/album';
import { UserService } from '../user/services/user.service';
import { Artist } from '../artists/interfaces/artist';
import { Track } from '../shared/interfaces/track';
import { From } from '../shared/interfaces/from';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

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
    private _userService: UserService,
    private _titleService: Title
  ) {}

  ngOnInit() {
    this._titleService.setTitle('Home - TREBLE');
    this.loadedRecently = false
    this.subs.push(this._userService.getRecentlyPlayedTracks().subscribe({
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
    }))
  }

  ngOnDestroy() {
    for(let sub of this.subs) {
      sub.unsubscribe()
    }
  }
}
