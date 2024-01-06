import {inject, Injectable, signal} from '@angular/core';
import {Queue} from "../interfaces/queue";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {AudioService} from "../../audio/audio.service";
import {BehaviorSubject} from "rxjs";
import {CurrentTrackInfo} from "../../shared/interfaces/current-track-info";

@Injectable({
  providedIn: 'root'
})
export class QueueService implements Queue {
  private currentTrackSubject = new BehaviorSubject<Track>({} as Track)
  public currentTrack$ = this.currentTrackSubject.asObservable()

  currentTrackSignal = signal<Track>({} as Track)
  private _audioService = inject(AudioService)
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
  }

  addTracks(tracks: Track[], from: From): void {
    this.queue = []
    this.queue.push(...tracks)
    this.from = from
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
    this.currentQueueIndexSignal.set(index)
    this.currentQueueIndex = index
    const track = this.queue[this.currentQueueIndex]
    this.setCurrentTrack(track)
    this._audioService.playTrack(track, this.from)

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
      this.shuffleQueueIndex = Math.floor(Math.random() * queueLength)
      console.log(this.shuffleQueueIndex)
    }
  }

  goForward(): void {
    if(this.shuffleQueue) {
      this.shuffle()
      this.playAtIndex(this.shuffleQueueIndex)
      return
    }
    this.currentQueueIndex++
    if(this.currentQueueIndex > this.queue.length - 1) {
      this.currentQueueIndex = 0
    }
    this.playAtIndex(this.currentQueueIndex)
  }
  goPrevious(): void {
    this.currentQueueIndex--
    if(this.currentQueueIndex == -1) {
      this.currentQueueIndex = this.queue.length - 1
    }
    this.playAtIndex(this.currentQueueIndex)
  }
}
