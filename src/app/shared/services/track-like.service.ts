import {inject, Injectable, signal} from '@angular/core';
import {Track} from "../interfaces/track";
import {TrackDurationService} from "./track-duration.service";

@Injectable({
  providedIn: 'root'
})
export class TrackLikeService {
  like = signal<Map<string,Track>>(new Map<string, Track>())
  private _trackDurationService = inject(TrackDurationService)
  setInitialLikedTracks(liked_tracks: Track[]) {
    for(let track of liked_tracks) {
      this.like.update((map) => map.set(track.id, track))
    }
    console.log(this.like())
  }
  getLikedTracks() {
    const tracks: Track[] = []
    for (let track of this.like().values()){
      tracks.push(track)
    }
    return tracks
  }
  deleteTrackFromLiked (id: string) {
    this.like.update((map) => {
      map.delete(id)
      return map
    })
    this._trackDurationService.calculateTotalDurationOfTracks(this.getLikedTracks())
  }
  addTrackToLiked(track: Track) {
    this.like.update(map => {
      map.set(track.id, track)
      return map
    })
    console.log(this.like())
  }

}
