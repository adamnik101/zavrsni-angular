import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {BaseService} from "../../core/services/base.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminOperationsService extends BaseService{
  deleteItems(ids: string[], path: string) {
    return this.post(`admin/${path}/delete`, ids)
  }
}
