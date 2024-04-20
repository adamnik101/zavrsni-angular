import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BehaviorSubjectService} from "../../../core/services/behavior-subject.service";
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
