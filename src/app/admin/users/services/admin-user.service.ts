import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {BehaviorSubject} from "rxjs";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {User} from "../../../user/interfaces/user";
import {HttpParams} from "@angular/common/http";
import {Track} from "../../../shared/interfaces/track";
import {ResponseAPI} from "../../../shared/interfaces/response-api";

@Injectable({
  providedIn: 'root'
})
export class AdminUserService extends BaseService{
  private usersSubject = new BehaviorSubject<PagedResponse<User[]>>({} as PagedResponse<User[]>)
  public users$ = this.usersSubject.asObservable()
  params: HttpParams = new HttpParams();

  getPagedResponse(queryParams? : HttpParams) {
    let path = 'users/search'
    return this.get<ResponseAPI<PagedResponse<User[]>>>(path, {params: queryParams})
  }

  setPagedResponse(pagedResponse: PagedResponse<User[]>){
    this.usersSubject.next(pagedResponse)
  }

  navigateTo(url: string) {
    let part = url.split('api/')[1]
    return this.get<ResponseAPI<PagedResponse<Track[]>>>(part, {params: this.params})
  }
}
