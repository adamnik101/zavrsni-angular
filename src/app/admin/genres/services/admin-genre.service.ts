import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {BehaviorSubject} from "rxjs";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Genre} from "../../../genre/interfaces/genre";
import {HttpParams} from "@angular/common/http";
import {Album} from "../../../albums/interfaces/album";

@Injectable({
  providedIn: 'root'
})
export class AdminGenreService extends BaseService{
  private genreSubject = new BehaviorSubject<PagedResponse<Genre[]>>({} as PagedResponse<Genre[]>)
  public genres$ = this.genreSubject.asObservable()
  params: HttpParams = new HttpParams()
  getPagedResponse(queryParams?: HttpParams) {
    return this.get<PagedResponse<Genre[]>>('admin/genres', {params: queryParams})
  }

  setPagedResponse(pagedResponse: PagedResponse<Genre[]>) {
    this.genreSubject.next(pagedResponse)
  }

  navigateTo(url: string, queryParams: HttpParams) {
    let part = url.split('api/')[1]
    return this.get<PagedResponse<Genre[]>>(part, {params: queryParams})
  }
}
