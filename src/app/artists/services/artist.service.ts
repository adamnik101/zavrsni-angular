import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Artist} from "../interfaces/artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BaseService{

  getArtist(id: string) {
    return this.get<Artist>(`artists/${id}`)
  }

  getArtists() {
    return this.get<Artist[]>('artists')
  }
}
