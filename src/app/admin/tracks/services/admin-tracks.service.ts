import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Track} from "../../../shared/interfaces/track";
import {BehaviorSubject} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Artist} from "../../../artists/interfaces/artist";

@Injectable({
  providedIn: 'root'
})
export class AdminTracksService extends BaseService{
  private tracksSubject = new BehaviorSubject<PagedResponse<Track[]>>( {} as PagedResponse<Track[]>)
  public tracks$ = this.tracksSubject.asObservable();

  private softDeletedSubject = new BehaviorSubject<PagedResponse<Track[]>>({} as PagedResponse<Track[]>)
  public softTracks$ = this.softDeletedSubject.asObservable()

  public params = new HttpParams()
  getPagedResponse(params?: HttpParams) {
    let path = 'admin/tracks'
    return this.get<PagedResponse<Track[]>>(path, {params: params})
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

  navigateTo(url: string) {
    let part = url.split('api/')[1]
    return this.get<PagedResponse<Track[]>>(part, {params: this.params})
  }

  addTrack(formData: FormData) {
    return this.post('admin/tracks/add', formData)
  }

  updateTrack(id: string, group: FormGroup) {
     let formData = new FormData()

      formData.append('cover', 'test')
      formData.append('track', 'test')
      formData.append('title', group.get('title')?.value)
      formData.append('owner', group.get('owner')?.value.id)
      formData.append('album', group.get('album')?.value)
      formData.append('explicit', group.get('explicit')?.value)
      formData.append('genre', group.get('genre')?.value)
      if(group.get('features')?.value) {
        for(let id of group.get('features')!.value) {
          formData.append('features[]', id)
        }

      }
      return this.post(`admin/tracks/${id}/update`, formData)
  }
}
