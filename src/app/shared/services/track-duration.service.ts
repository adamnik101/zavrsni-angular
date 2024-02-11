import { Injectable } from '@angular/core';
import {Track} from "../interfaces/track";

@Injectable({
  providedIn: 'root'
})
export class TrackDurationService {

  calculateTotalDurationOfTracks(tracks: Track[]): number {
    let duration : number = 0

    for (let track of tracks) {
         duration += Number(track.duration)
    }

    return duration
  }
}
