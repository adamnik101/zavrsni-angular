import {Pipe, PipeTransform} from '@angular/core';
import {Track} from "../../interfaces/track";
import {From} from "../../interfaces/from";
import {CurrentTrackInfo} from "../../interfaces/current-track-info";

@Pipe({
  name: 'isCurrentTrack',
  standalone: true,
  pure: true
})
export class IsCurrentTrackPipe implements PipeTransform {
  transform(currentTrackInfo: CurrentTrackInfo | null, track: Track, index: number, from: From): boolean {
    console.log('c')
    if(currentTrackInfo !== null && currentTrackInfo.track === track.id && from.id === currentTrackInfo.from && index === currentTrackInfo.index) {

      return true
    }
    return false
  }

}
