import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {BehaviorSubject} from "rxjs";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Genre} from "../../../genre/interfaces/genre";
import {HttpParams} from "@angular/common/http";
import {Album} from "../../../albums/interfaces/album";
import {ResponseAPI} from "../../../shared/interfaces/response-api";
import {FormControl, FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class AdminGenreService extends BaseService{
  private genreSubject = new BehaviorSubject<PagedResponse<Genre[]>>({} as PagedResponse<Genre[]>)
  public genres$ = this.genreSubject.asObservable()
  params: HttpParams = new HttpParams()
  getPagedResponse(queryParams?: HttpParams) {
    return this.get<ResponseAPI<PagedResponse<Genre[]>>>('genres/search', {params: queryParams})
  }

  setPagedResponse(pagedResponse: PagedResponse<Genre[]>) {
    this.genreSubject.next(pagedResponse)
  }

  navigateTo(url: string) {
    let part = url.split('api/')[1]
    return this.get<ResponseAPI<PagedResponse<Genre[]>>>(part, {params: this.params})
  }

  insertGenre(name: string) {
    return this.post<{name: string}, ResponseAPI<Genre>>('genres', {name})
  }
}
