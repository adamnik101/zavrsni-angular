import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Genre} from "../interfaces/genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService extends BaseService{

  getGenres() {
    return this.get<Genre[]>('genres')
  }

  getGenre(id: string) {
    return this.get(`genres/${id}`)
  }
}
