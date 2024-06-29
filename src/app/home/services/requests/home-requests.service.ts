import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ConfigService } from 'src/app/config/config.service';
import { BaseService } from 'src/app/core/services/base.service';
import { ResponseAPI } from 'src/app/shared/interfaces/response-api';
import { HomepageData } from '../../interfaces/homepage-data';
import { AlbumService } from 'src/app/albums/services/album.service';
import { TrackService } from 'src/app/tracks/services/track.service';
import { UserRequestsService } from 'src/app/user/services/requests/user-requests.service';
import { Album } from 'src/app/albums/interfaces/album';
import { Track } from 'src/app/shared/interfaces/track';

@Injectable({
  providedIn: 'root'
})
export class HomeRequestsService extends BaseService{

  constructor(
    protected http: HttpClient,
    protected configService: ConfigService,
    private albumService: AlbumService,
    private trackService: TrackService,
    private userRequests: UserRequestsService
  ) {
    super(http, configService);
  }

  public getAllDataForHomePage(userLoaded: boolean | null): Observable<any> {
    const requests = [
      this.getAlbumNewReleases(),
      this.getTrackNewReleases()
    ];

    let returnObj: any = {
      albums: requests[0],
      tracks: requests[1]
    }

    if(userLoaded) {
      returnObj['recent'] = this.getUserRecentlyPlayedTracks();
    }

    return forkJoin(returnObj);
  }

  private getAlbumNewReleases(): Observable<ResponseAPI<Album[]>> {
    return this.albumService.getNewReleases();
  }

  private getTrackNewReleases(): Observable<ResponseAPI<Track[]>> {
    return this.trackService.getNewReleases();
  }

  private getUserRecentlyPlayedTracks(): Observable<ResponseAPI<Track[]>> {
    return this.userRequests.getRecentlyPlayedTracks();
  }
}
