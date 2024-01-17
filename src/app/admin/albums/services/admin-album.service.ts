import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {BehaviorSubject} from "rxjs";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Album} from "../../../albums/interfaces/album";
import {BehaviorSubjectService} from "../../../core/services/behavior-subject.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAlbumService extends BaseService{
  private albumsSubject = new BehaviorSubject<PagedResponse<Album[]>>({} as PagedResponse<Album[]>)
  public albums$ = this.albumsSubject.asObservable();

  getAlbums() {
    return this.get<PagedResponse<Album[]>>('admin/albums')
  }
  setPagedResponse(pagedResponse: PagedResponse<Album[]>){
    this.albumsSubject.next(pagedResponse)
  }

  navigateTo(url: string) {
    const part = url.split('api/')[1]

    return this.get<PagedResponse<Album[]>>(part)
  }
}
