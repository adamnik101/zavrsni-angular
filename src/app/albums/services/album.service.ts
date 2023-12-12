import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Album} from "../interfaces/album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService{

  getAlbum(id: string) {
    return this.get<Album>(`albums/${id}`)
  }

  getLatest() {
    return this.get<Album[]>('albums/latest')
  }
}
