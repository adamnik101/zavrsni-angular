import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BehaviorSubjectService} from "../../../core/services/behavior-subject.service";

@Injectable({
  providedIn: 'root'
})
export class AdminRolesService{
  private rolesSubject = new BehaviorSubject({})
  public roles$ = this.rolesSubject.asObservable()

  constructor() { }
}
