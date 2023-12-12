import {inject, Injectable, signal} from '@angular/core';
import {Track} from "../shared/interfaces/track";
import {From} from "../shared/interfaces/from";
import {BaseService} from "../core/services/base.service";
import {QueueService} from "../queue/services/queue.service";

@Injectable({
  providedIn: 'root'
})
export class AudioService extends BaseService{
  public currentTrack = signal<Track>({} as Track)

  currentlyPlayingTrack: Track = {} as Track
  //private _queueService = inject(QueueService)
  from: From = { } as From
  audio : HTMLAudioElement = new Audio()
  currentTime = 0
  duration = 0
  isPlaying: boolean = false

  repeatIndex: number = 0
  repeat : string[] = ['no-repeat', 'repeat-all', 'repeat-one']
  shuffle: boolean = false;
  volumeValue: number = 0.5;
  private muted: boolean = false;

  playTrack(track: Track, from: From) {
    this.currentTrack.set(track)
   // this._queueService.setCurrentTrack(track)
    this.audio.src = track.path
    this.from = from
    this.currentlyPlayingTrack = track

    this.get(`tracks/${track.id}`).subscribe({
      next: (response) => {
        console.log(response)


      }
    })
    this.audio.play().then(() => {
      this.audio.oncanplaythrough = () => {
        this.duration = this.audio.duration * 1000
        this.isPlaying = true
        this.audio.ontimeupdate = () => {
          this.currentTime = this.audio.currentTime * 1000
        }
        this.audio.onended = () => {
          switch (this.repeatIndex) {
            case 1 : this.repeatQueue();break
            case 2 : this.playTrack(track, from); break
            }
          this.isPlaying = false
        }
      }
    })
  }
  playQueue(tracks: Track[], from: From) {

    /*this._queueService.addTrack(tracks)
    console.log(this.queue)
    this.playTrack(this.queue.peek(0), from)*/
  }

  continue() {
    this.audio.play().then(() => {
      this.isPlaying = true
    })
  }

  pause() {
    this.audio.pause()
    this.isPlaying = false
  }

  toggleRepeat() {
    if(this.repeatIndex == this.repeat.length - 1) {
      this.repeatIndex = 0
      return
    }
    this.repeatIndex++
  }

  seekToTime(value: string) {
    this.audio.currentTime = Number(value) / 1000
    this.continue()
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle
  }

  changeVolume(value: string) {
    if(this.audio.volume != 0) {
      this.audio.muted = false
    }
      this.audio.volume = Number(value)
      this.volumeValue = this.audio.volume
  }

  private repeatQueue() {
    /*if(this.queueIndex == this.queue.length - 1) {
      this.playTrack(this.currentlyPlayingTrack, this.from)
    }*/
  }

  goForward() {

  }

  goPrevious() {

  }

  toggleMuteVolume() {
    if(this.audio.volume != 0) {
      this.volumeValue = this.audio.volume
    }
    this.audio.muted = !this.audio.muted

    if(this.audio.muted) {
      this.audio.volume = 0
      return
    }
    this.audio.volume = this.volumeValue
  }
}
