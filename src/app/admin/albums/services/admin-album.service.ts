import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {BehaviorSubject} from "rxjs";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Album} from "../../../albums/interfaces/album";
import {BehaviorSubjectService} from "../../../core/services/behavior-subject.service";
import {HttpParams} from "@angular/common/http";
import {Artist} from "../../../artists/interfaces/artist";
import {ResponseAPI} from "../../../shared/interfaces/response-api";

@Injectable({
  providedIn: 'root'
})
export class AdminAlbumService extends BaseService{
  private albumsSubject = new BehaviorSubject<PagedResponse<Album[]>>({} as PagedResponse<Album[]>)
  public albums$ = this.albumsSubject.asObservable();
  public params = new HttpParams()
  getPagedResponse(queryParams? : HttpParams) {
    return this.get<ResponseAPI<PagedResponse<Album[]>>>('albums/search', {params: queryParams})
  }
  setPagedResponse(pagedResponse: PagedResponse<Album[]>){
    console.log(pagedResponse);
    this.albumsSubject.next(pagedResponse)
  }

  navigateTo(url: string) {
    let part = url.split('api/')[1]
    return this.get<ResponseAPI<PagedResponse<Album[]>>>(part, {params: this.params})
  }
}
