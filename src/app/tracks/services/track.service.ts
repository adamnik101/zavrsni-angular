import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {Track} from "../../shared/interfaces/track";
import {PagedResponse} from "../../shared/interfaces/paged-response";

@Injectable({
  providedIn: 'root'
})
export class TrackService extends BaseService{

  getNewReleases() {
    return this.get<ResponseAPI<Track[]>>('tracks/new-releases')
  }

  getTrending() {
    return this.get<ResponseAPI<Track[]>>('tracks/trending')
  }

  getTracks() {
    return this.get<ResponseAPI<PagedResponse<Track[]>>>('tracks')
  }
}
