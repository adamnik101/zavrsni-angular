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

  private softDeletedSubject = new BehaviorSubject<PagedResponse<Track[]>>({} as PagedResponse<Track[]>)
  public softTracks$ = this.softDeletedSubject.asObservable()
  getTracks(searchValue?: string) {
    let path = 'admin/tracks'
    if(searchValue) {
      path += `?search=${searchValue}`
    }
    return this.get<PagedResponse<Track[]>>(path)
  }
  getSoftDeletedTracks() {
    return this.get<PagedResponse<Track[]>>('admin/tracks/soft-deleted')
  }
  setPagedResponse(pagedResponse: PagedResponse<Track[]>, soft?: boolean) {
    if(soft) {
      this.softDeletedSubject.next(pagedResponse)
      return
    }
    this.tracksSubject.next(pagedResponse)
  }

  navigateTo(url: string, searchValue?: string) {
    let part = url.split('api/')[1]
    if(searchValue) part += `?search=${searchValue}`

    return this.get<PagedResponse<Track[]>>(part)
  }

  addTrack(formData: FormData) {
    return this.post('admin/tracks/add', formData)
  }
}
