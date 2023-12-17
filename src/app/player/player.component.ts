import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {AudioService} from "../audio/audio.service";
import {Track} from "../shared/interfaces/track";
import {From} from "../shared/interfaces/from";
import {formatDate} from "@angular/common";
import {QueueService} from "../queue/services/queue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QueueComponent} from "../queue/queue.component";
import {Subscription} from "rxjs";
import {ColorThiefService} from "../shared/services/color-thief.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  shuffle1 = false
  currentTrack : Track = {} as Track
  currSub! : Subscription
  currentImage: string = ''
  @ViewChild('player') player!: ElementRef
  constructor(public audioService: AudioService, private _queueService: QueueService, private _router: Router, private _route: ActivatedRoute) { }
  /*get currentTrack() : Track {
    return this.audioService.currentlyPlayingTrack
  }
  */
  ngOnInit() {
    this.currSub = this._queueService.currentTrack$.subscribe({
      next: (track) => {
        this.currentTrack = track
      }
    })
  }
  ngOnDestroy() {
    this.currSub.unsubscribe()
  }
  get from(): From {
    return this.audioService.from
  }

  formatTime(value: number) {
    const seconds: number = Math.floor(value / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string = minutes < 10 ? '0' + minutes : String(minutes);
    const formattedSeconds: string = remainingSeconds < 10 ? '0' + remainingSeconds : String(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  seekTo(value : string) {
    this.audioService.seekToTime(value)
  }
  continue() {
    this.audioService.continue()
  }
  pause() {
    this.audioService.pause()
  }
  toggleRepeat() {
    this.audioService.toggleRepeat()
  }

  toggleShuffle() {
    //this.audioService.toggleShuffle()
    this._queueService.shuffleQueue = !this._queueService.shuffleQueue
    this.shuffle1 = this._queueService.shuffleQueue
  }

  changeVolume(value: string) {
    this.audioService.changeVolume(value)
  }

  goForward() {
    if(this._queueService.shuffleQueue) {
      this._queueService.shuffle()
      this._queueService.playAtIndex(this._queueService.shuffleQueueIndex)
      return
    }
    this._queueService.currentQueueIndex++
    if(this._queueService.currentQueueIndex > this._queueService.queue.length - 1) {
      this._queueService.currentQueueIndex = 0
    }
    this._queueService.playAtIndex(this._queueService.currentQueueIndex)
  }

  goPrevious() {
    this._queueService.currentQueueIndex--
    if(this._queueService.currentQueueIndex == -1) {
      this._queueService.currentQueueIndex = this._queueService.queue.length - 1
    }
    this._queueService.playAtIndex(this._queueService.currentQueueIndex)
  }

  toggleMuteVolume() {
    this.audioService.toggleMuteVolume()
  }

  toggleQueue() {
    this._queueService.queueOpened = !this._queueService.queueOpened
  }
  @HostListener('window:keydown', ["$event"])
  handleSpaceDown(event: KeyboardEvent) {
    if(event.key === " ") {
      event.preventDefault()
      if(!this.audioService.audio.paused) {
        this.audioService.pause()
        return
      }
      this.audioService.continue()
    }
  }
}
