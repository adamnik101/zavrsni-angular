import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {Artist} from "../../artists/interfaces/artist";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService{

  dashboard() {
    return this.get('admin/dashboard')
  }


  deleteResource(id: any, path: string) {
    return this.delete(`admin/${path}/${id}/delete`)
  }
}
