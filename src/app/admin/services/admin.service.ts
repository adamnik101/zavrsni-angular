import {inject, Injectable} from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {Artist} from "../../artists/interfaces/artist";
import {Observable} from "rxjs";
import {SelectionService} from "./selection.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import { DashboardResponse } from '../interfaces/dashboard-response';
import {SnackbarService} from "../../shared/services/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService{

  private _selectionService = inject(SelectionService);
  dashboard() {
    return this.get<ResponseAPI<DashboardResponse>>('admin/dashboard')
  }


  deleteResource(id: any, path: string) {
    return this.delete(`${path}/${id}`)
  }

  deleteMany(toDelete: string) {
    return this.post(`${toDelete}/delete-many`, {data: this._selectionService.selectedItems()})
  }

  update(path: string, data: FormData, id: string) {
    return this.post(`${path}/${id}`, data);
  }

  insert(path: string, data: FormData) {
    return this.post(`${path}`, data);
  }
}
