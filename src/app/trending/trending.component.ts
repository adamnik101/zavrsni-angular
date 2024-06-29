import { Component } from '@angular/core';
import {Track} from "../shared/interfaces/track";
import {From} from "../shared/interfaces/from";
import {Title} from "@angular/platform-browser";
import {Album} from "../albums/interfaces/album";
import {Artist} from "../artists/interfaces/artist";
import {Subscription} from "rxjs";

import { SpinnerFunctions } from '../core/static-functions';
import { TrendingRequestsService } from './services/requests/trending-requests.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {
  popularTracks : Track[] = [];
  popularAlbums: Album[] = [];
  popularArtists: Artist[] = [];
  subs: Subscription = new Subscription;
  from: From = {} as From;

  constructor(
    private trendingRequests: TrendingRequestsService,
    private _titleService: Title
  ) { }

  ngOnInit(): void {
    SpinnerFunctions.showSpinner();
    this._titleService.setTitle('Trending - TREBLE');
    this.subs.add(
      this.trendingRequests.getAllData().subscribe({
        next: (response) => {
          if(response) {
            this.popularTracks = response.tracks.data;
            this.popularArtists = response.artists.data;
            this.popularAlbums = response.albums.data;

            this.setFrom();
            SpinnerFunctions.hideSpinner();
          }
        }
      })
    );
  }

  setFrom(): void {
    this.from = {
      id : '',
      name : "Trending",
      url : "/trending"
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
