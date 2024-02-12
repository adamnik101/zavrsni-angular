import {Injectable, signal} from '@angular/core';
import {Track} from "../interfaces/track";

@Injectable({
  providedIn: 'root'
})
export class TrackDurationService {
  totalDuration = signal<number>(0)
  calculateTotalDurationOfTracks(tracks: Track[]): void {
    this.totalDuration.set(0)
    for (let track of tracks) {
         this.totalDuration.update(duration => {
           return duration += Number(track.duration)
         })
    }
  }
}
