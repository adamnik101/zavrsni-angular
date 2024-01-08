import {ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {AudioService} from "../audio/audio.service";
import {Track} from "../shared/interfaces/track";
import {From} from "../shared/interfaces/from";
import {QueueService} from "../queue/services/queue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
  shuffle1 = false
  currSub! : Subscription
  currentImage: string = ''
  @ViewChild('player') player!: ElementRef
  constructor(public audioService: AudioService,
              protected _queueService: QueueService,
              private _router: Router,
              private _route: ActivatedRoute) { }
  /*get currentTrack() : Track {
    return this.audioService.currentlyPlayingTrack
  }
  */

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
    this._queueService.currentTrackInfo.update((tr) => {
      if(tr) {
        tr.isBeingPlayed = true
      }
      return tr
    })
    console.log(this._queueService.currentTrackInfo())

    this.audioService.continue()
  }
  pause() {
    this._queueService.currentTrackInfo.update((tr) => {
      if(tr) {
        tr.isBeingPlayed = false
      }
      return tr
    })
    console.log(this._queueService.currentTrackInfo())
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
    this._queueService.goForward()
  }

  goPrevious() {
    this._queueService.goPrevious()
  }

  toggleMuteVolume() {
    this.audioService.toggleMuteVolume()
  }

  toggleQueue() {
    this._queueService.queueOpened = !this._queueService.queueOpened
  }
  @HostListener('window:keydown', ["$event"])
  handleSpaceDown(event: KeyboardEvent) {
    if(this._queueService.currentTrackInfo()?.isBeingPlayed) {
      if(event.key === " ") {
        event.preventDefault()
        if(!this.audioService.audio.paused) {
          this.pause()
          return
        }
        this.continue()
      }
    }
  }

  goSecondsForward(seconds: number) {
    this.audioService.audio.currentTime += seconds
  }

  goSecondsBack(seconds: number) {
    this.audioService.audio.currentTime -= seconds
  }
}
