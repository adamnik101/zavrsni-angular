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
  private sub1!: Subscription;
  private sub2!: Subscription;
  private sub3!: Subscription;
  private sub5!: Subscription;
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
    this.sub5 = this._userService.getRecentlyPlayedTracks().subscribe({
      next: (tracks) => {
        this.recentTracks = tracks;
        this.loadedRecently = true
      },
    });
    this.sub1 = this._albumService.getLatest().subscribe({
      next: (response) => {
        this.albums = response;
      },
    });
    this.sub2 = this._userService.getRecommendedArtists().subscribe({
      next: (artists) => {
        this.recommendedArtists = artists;
      },
    });
    this.sub3 = this._userService.getRecommendedTracks().subscribe({
      next: (tracks) => {
        this.recommendedTracks = tracks;
        this.loading = false;
      },
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub5.unsubscribe();
  }
}
