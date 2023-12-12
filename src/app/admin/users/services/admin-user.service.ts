import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {BehaviorSubject} from "rxjs";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {User} from "../../../user/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AdminUserService extends BaseService{
  private usersSubject = new BehaviorSubject<PagedResponse<User[]>>({} as PagedResponse<User[]>)
  public users$ = this.usersSubject.asObservable()

  getUsers() {
    return this.get<PagedResponse<User[]>>('admin/actors')
  }

  setPagedResponse(pagedResponse: PagedResponse<User[]>){
    this.usersSubject.next(pagedResponse)
  }

  navigateTo(url: string) {
    const part = url.split('api/')[1]
    return this.get<PagedResponse<User[]>>(part)
  }
}
