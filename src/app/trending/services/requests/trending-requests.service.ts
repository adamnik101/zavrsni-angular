import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AlbumService } from 'src/app/albums/services/album.service';
import { ArtistService } from 'src/app/artists/services/artist.service';
import { ConfigService } from 'src/app/config/config.service';
import { BaseService } from 'src/app/core/services/base.service';
import { TrackService } from 'src/app/tracks/services/track.service';

@Injectable({
  providedIn: 'root'
})
export class TrendingRequestsService extends BaseService{

  constructor(
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    protected http: HttpClient,
    protected configService: ConfigService
  ) {
    super(http, configService);
  }

  getAllData(): Observable<any> {
    const requests = [
      this.getPopularTracks(),
      this.getPopularAlbums(),
      this.getPopularArtists()
    ];

    return forkJoin({
      tracks: requests[0],
      albums: requests[1],
      artists: requests[2]
    });
  }

  getPopularTracks() {
    return this.trackService.getTrending();
  }

  getPopularAlbums() {
    return this.albumService.getTrending();
  }

  getPopularArtists() {
    return this.artistService.getTrending();
  }
}
