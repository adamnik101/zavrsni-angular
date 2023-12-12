import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Track} from "../../shared/interfaces/track";
import {Album} from "../../albums/interfaces/album";
import {Artist} from "../../artists/interfaces/artist";

@Injectable({
  providedIn: 'root'
})
export class TrendingService extends BaseService{

  getPopularTracks() {
    return this.get<Track[]>('tracks/popular')
  }

  getPopularAlbums() {
    return this.get<Album[]>('albums/popular')
  }
  getPopularArtists() {
    return this.get<Artist[]>('artists/popular')
  }
}
