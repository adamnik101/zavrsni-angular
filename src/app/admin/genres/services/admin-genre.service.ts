import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {BehaviorSubject} from "rxjs";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Genre} from "../../../genre/interfaces/genre";

@Injectable({
  providedIn: 'root'
})
export class AdminGenreService extends BaseService{
  private genreSubject = new BehaviorSubject<PagedResponse<Genre[]>>({} as PagedResponse<Genre[]>)
  public genres$ = this.genreSubject.asObservable()
  getGenres() {
    return this.get<PagedResponse<Genre[]>>('admin/genres')
  }

  setPagedResponse(pagedResponse: PagedResponse<Genre[]>) {
    this.genreSubject.next(pagedResponse)
  }

  navigateTo(url: string) {
    const part = url.split('api/')[1]
    return this.get<PagedResponse<Genre[]>>(part).subscribe({
      next: (pagedResponse) => {
        this.setPagedResponse(pagedResponse)
      }
    })
  }
}
