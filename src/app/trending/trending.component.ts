import { Component } from '@angular/core';
import {TrendingService} from "./services/trending.service";
import {Track} from "../shared/interfaces/track";
import {From} from "../shared/interfaces/from";
import {Title} from "@angular/platform-browser";
import {Album} from "../albums/interfaces/album";
import {Artist} from "../artists/interfaces/artist";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {
  popularTracks : Track[] = []
  popularAlbums: Album[] = []
  popularArtists: Artist[] = []
  loaded: boolean = false;
  subs: Subscription[] = []
  from: From = {
    id : '',
    name : "Trending",
    url : "/trending"
  }
  constructor(private _trendingService: TrendingService, private _titleService: Title) { }

  ngOnInit() {
    this._titleService.setTitle('Trending - TREBLE')
    this.subs.push(this._trendingService.getPopularTracks().subscribe({
      next: (tracks) => {
        this.popularTracks = tracks
        console.log(this.popularTracks)
      }
    }))
    this.subs.push(this._trendingService.getPopularAlbums().subscribe({
      next: (response) => {
        this.popularAlbums = response
        console.log(this.popularAlbums)
      }
    }))
    this.subs.push(this._trendingService.getPopularArtists().subscribe({
      next: (response) => {
        this.popularArtists = response
        console.log(this.popularArtists)
        this.loaded = true
      }
    }))
  }
  ngOnDestroy() {
    for (let sub of this.subs) {
      sub.unsubscribe()
    }
  }
}
