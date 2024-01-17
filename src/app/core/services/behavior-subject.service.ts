import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService<T>  extends BaseService{
  protected behaviorSubject = new BehaviorSubject<T>({} as T)
  public data$ = this.behaviorSubject.asObservable()


}
