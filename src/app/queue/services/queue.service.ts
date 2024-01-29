import {inject, Injectable, signal} from '@angular/core';
import {Queue} from "../interfaces/queue";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {AudioService} from "../../audio/audio.service";
import {BehaviorSubject} from "rxjs";
import {CurrentTrackInfo} from "../../shared/interfaces/current-track-info";
import {UserService} from "../../user/services/user.service";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class QueueService implements Queue {
  private currentTrackSubject = new BehaviorSubject<Track>({} as Track)
  public currentTrack$ = this.currentTrackSubject.asObservable()

  currentTrackSignal = signal<Track>({} as Track)
  private _audioService = inject(AudioService)
  private _userService = inject(UserService)
  private _snackbar = inject(SnackbarService)
  shuffleQueue: boolean = false
  shuffleQueueIndex: number = 0
  queue: Track[] = []
  currentQueueIndex: number = 0
  queueOpened: boolean = false;
  from: From = {} as From
  currentQueueIndexSignal = signal<number>(0)
  currentTrackInfo = signal<CurrentTrackInfo | null>(null)
  public setCurrentTrack(track: Track) {
    this.currentTrackSignal.set(track)
    this.currentTrackSubject.next(track)
    this.currentTrackInfo.set({
      index : this.currentQueueIndexSignal(),
      track : this.queue[this.currentQueueIndexSignal()].id,
      from: this.from.id,
      isBeingPlayed: true
    })
    localStorage.setItem('current-track', JSON.stringify(this.currentTrackInfo()))
    console.log(track)
  }

  addTrack(track: Track, from: From): void {
    this.queue.push(track)
    this.from = from
    if(this.currentTrackInfo() == null) {
      this.setCurrentTrack(track)
    }
  }

  addTracks(tracks: Track[], from: From): void {
    this.queue = []
    this.queue.push(...tracks)
    this.from = from
    console.log(this.from)
  }

  clear(): void {
    this.queue = []
  }

  currentIndex(): number {
    return this.currentQueueIndex;
  }

  isEmpty(): boolean {
    return !this.queue.length
  }

  peek(index: number): Track | undefined {
    return this.queue.at(index)
  }

  playAtIndex(index: number): void {
    const track = this.queue[index]
        if(!track.explicit) {
          this.currentQueueIndexSignal.set(index)
          this.currentQueueIndex = index
          this.setCurrentTrack(track)
          this._audioService.playTrack(track, this.from)
        }
        else if(this._userService.settings().explicit && track.explicit) {
          this.currentQueueIndexSignal.set(index)
          this.currentQueueIndex = index
          this.setCurrentTrack(track)
          this._audioService.playTrack(track, this.from)
        }
        else if(!this._userService.settings().explicit && track.explicit) {
          this._snackbar.showDefaultMessage("Content not available.")
        }
  }

  remove(index: number): Track[] {
    if(index < this.currentQueueIndex) {
      this.currentQueueIndex--
    }
    return this.queue.splice(index, 1)
  }

  shuffle(): void {
    if(this.shuffleQueue) {
      console.log('shuffle from queue')
      const queueLength = this.queue.length
      let generateIndex = (upTo: number) => {
        let random;

        do {
          random = Math.floor(Math.random() * upTo);
        } while (random === this.shuffleQueueIndex);

        return random
      }

      this.shuffleQueueIndex = generateIndex(queueLength)
      console.log(this.shuffleQueueIndex)
    }

  }

  goForward(): void {
    if(this.shuffleQueue) {
      this.shuffle()
      this.playAtIndex(this.shuffleQueueIndex)
      return
    }
    let addToIndex = 1

    while (!this._userService.settings().explicit && this.queue[this.currentQueueIndex + addToIndex]?.explicit) {
      console.log(this.currentQueueIndex, addToIndex, this.queue.length)
      if(this.currentQueueIndex + addToIndex == this.queue.length - 1) {
        addToIndex = 1
        this.currentQueueIndex = 0
        continue
      }
      addToIndex++
    }

    this.currentQueueIndex += addToIndex

    if(this.currentQueueIndex > this.queue.length - 1) {
      this.currentQueueIndex = 0
    }
    console.log(this.currentQueueIndex)

    this.playAtIndex(this.currentQueueIndex)
  }
  goPrevious(): void {
    let amount = 1

    while (!this._userService.settings().explicit && this.queue[this.currentQueueIndex - amount]?.explicit) {
      if(this.currentQueueIndex - amount == 0) {
        amount = 1
        this.currentQueueIndex = this.queue.length - 1
        continue
      }
      amount++
    }
    console.log(this.currentQueueIndex)
    this.currentQueueIndex -= amount
    if(this.currentQueueIndex == -1) {
      this.currentQueueIndex = this.queue.length - 1
    }
    this.playAtIndex(this.currentQueueIndex)
  }

  playAllFromIndex(tracks: Track[], index: number, from: From) {
    console.log(tracks, index, from)
    this.currentQueueIndexSignal.set(index)
    this.addTracks(tracks, from)
    this.playAtIndex(index)
  }
}
