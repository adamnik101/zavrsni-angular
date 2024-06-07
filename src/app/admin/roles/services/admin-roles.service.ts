import { Injectable } from '@angular/core';
import {BaseService} from "../../../core/services/base.service";
import {Role} from "../../../user/interfaces/role";
import {ResponseAPI} from "../../../shared/interfaces/response-api";

@Injectable({
  providedIn: 'root'
})
export class AdminRolesService extends BaseService{

  getRoles() {
    return this.get<ResponseAPI<Role[]>>('roles')
  }
}
