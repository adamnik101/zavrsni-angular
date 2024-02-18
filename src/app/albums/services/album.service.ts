import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Album} from "../interfaces/album";
import {ResponseAPI} from "../../shared/interfaces/response-api";

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService{

  getAlbum(id: string) {
    return this.get<ResponseAPI<Album>>(`albums/${id}`)
  }

  getLatest() {
    return this.get<Album[]>('albums/latest')
  }

  likeAlbum(id: string) {
    return this.post<{uuid: string}, ResponseAPI<Album[]>>(`me/albums`, {uuid: id})
  }

  removeFromLiked(id: string) {
    return this.delete(`me/albums/${id}`)
  }
}
