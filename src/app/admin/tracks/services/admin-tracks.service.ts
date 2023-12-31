import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Track} from "../../../shared/interfaces/track";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminTracksService extends BaseService{
  private tracksSubject = new BehaviorSubject<PagedResponse<Track[]>>( {} as PagedResponse<Track[]>)
  public tracks$ = this.tracksSubject.asObservable();
  getTracks() {
    return this.get<PagedResponse<Track[]>>('admin/tracks')
  }

  setPagedResponse(pagedResponse: PagedResponse<Track[]>) {
    this.tracksSubject.next(pagedResponse)
  }

  navigateTo(url: string) {
    const part = url.split('api/')[1]
    return this.get<PagedResponse<Track[]>>(part)
  }
}
