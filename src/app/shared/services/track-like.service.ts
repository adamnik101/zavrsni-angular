import {inject, Injectable, signal} from '@angular/core';
import {Track} from "../interfaces/track";
import {TrackDurationService} from "./track-duration.service";
import {LikeService} from "./like.service";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class TrackLikeService {
  like = signal<Map<string,Track>>(new Map<string, Track>())
  constructor(private _trackDurationService: TrackDurationService,
              private _likeService: LikeService,
              private _snackbarService: SnackbarService) { }

  setInitialLikedTracks(liked_tracks: Track[]) {
    this.like.set(new Map<string, Track>())
    for(let track of liked_tracks) {
      this.like.update((map) => map.set(track.id, track))
    }
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
  }
  addTrackToLiked(track: Track) {
    this.like.update(map => {
      map.set(track.id, track)
      return map
    })
  }

}
