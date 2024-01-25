import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Track} from "../../../shared/interfaces/track";
import {BehaviorSubject} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
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
  private _formData: FormData = new FormData()
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

  addTrack() {
    return this.post('admin/tracks/add', this._formData)
  }

  updateTrack(id: string, group: FormGroup) {
     let formData = new FormData()

      formData.append('cover', group.get('cover')?.value)
      formData.append('track', group.get('track')?.value)
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
  addToFormData(group: FormGroup) {
    this._formData = new FormData()
    this._formData.append('cover', group.get('cover')?.value)
    this._formData.append('track', group.get('track')?.value)
    this._formData.append('title', group.get('title')?.value)
    this._formData.append('owner', group.get('owner')?.value.id)
    this._formData.append('album', group.get('album')?.value)
    this._formData.append('explicit', group.get('explicit')?.value)
    this._formData.append('genre', group.get('genre')?.value)
    if(group.get('features')?.value) {
      for(let id of group.get('features')!.value) {
        this._formData.append('features[]', id)
      }
    }
  }
}
