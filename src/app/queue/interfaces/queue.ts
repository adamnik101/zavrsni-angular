import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {Observable} from "rxjs";

export interface Queue {
  queue: Track[]
  currentTrack$: Observable<Track>
  setCurrentTrack(track: Track) : void
  addTrack(track: Track, from: From): void
  addTracks(tracks: Track[], from: From): void
  remove(index: number) : Track[]
  peek(index: number) : Track | undefined
  isEmpty() : boolean
  currentIndex() : number
  clear() : void
  shuffle() : void
  playAtIndex(index: number) : void
}
