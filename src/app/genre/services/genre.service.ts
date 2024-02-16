import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Genre} from "../interfaces/genre";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenreService extends BaseService{

  getGenres() {
    return this.get<ResponseAPI<Genre[]>>('genres')
  }

  getGenre(id: string): Observable<ResponseAPI<Genre>> {
    return this.get<ResponseAPI<Genre>>(`genres/${id}`)
  }
}
