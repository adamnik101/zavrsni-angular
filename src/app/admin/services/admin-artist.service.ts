import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {Artist} from "../../artists/interfaces/artist";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminArtistService extends BaseService{
  private pagedResponseSubject = new BehaviorSubject<PagedResponse<Artist[]>>({} as PagedResponse<Artist[]>)
  public pagedResponse$ = this.pagedResponseSubject.asObservable();
  currentPage : number = 1
  getArtists(page?: number): Observable<PagedResponse<Artist[]>> {
    return this.get<PagedResponse<Artist[]>>(`admin/artists?page=${page}`)
  }
  navigateToNextPage() {
    return this.get<PagedResponse<Artist[]>>(`admin/artists?&page=${++this.currentPage}`)
  }

  navigateToPreviousPage() {
    return this.get<PagedResponse<Artist[]>>(`admin/artists?page=${--this.currentPage}`)
  }

  updateArtist(id: string, formData: FormData) {
    return this.post<FormData,Artist>(`admin/artists/${id}/update`, formData)
  }

  setPagedResponse(pagedResponse: PagedResponse<Artist[]>) {
    this.pagedResponseSubject.next(pagedResponse)
  }

  storeArtist(formData: FormData) {
    return this.post<FormData, null>('admin/artists', formData)
  }

  navigateTo(url: string) {
    const part = url.split('api/')
    return this.get<PagedResponse<Artist[]>>(part[1])
  }
}
