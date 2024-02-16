import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Track} from "../interfaces/track";

@Injectable({
  providedIn: 'root'
})
export class LikeService extends BaseService{

  likeTrack(id: string) {
    return this.post('actor/like', {track: id})
  }

  unlikeTrack(id: string) {
    return this.delete(`actor/liked/${id}/remove`)
  }
}
