import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ColorThiefService} from "../../../shared/services/color-thief.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgClass} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {QueueService} from "../../../queue/services/queue.service";
import {Track} from "../../../shared/interfaces/track";
import {From} from "../../../shared/interfaces/from";
import {AudioService} from "../../../audio/audio.service";

@Component({
  selector: 'app-small-header',
  standalone: true,
  imports: [
    NgClass,
    MatIconModule
  ],
  templateUrl: './small-header.component.html',
  styleUrl: './small-header.component.scss',
})
export class SmallHeaderComponent implements OnInit, OnDestroy{
  @Input('title') title: string = ''
  @Input('image') image: string  = ''
  @Input('from') from: From = {} as From
  @Input('shouldShow') shouldShow: boolean = false
  @Input('tracks') tracks: Track[] = []

  constructor(private _colorService: ColorThiefService,
              protected queueService: QueueService,
              private _audioService: AudioService) {
  }
  ngOnInit() {
    console.log('init')
    this._colorService.getRgbColorsFromImage(this.image,'small-header')
  }
  ngOnDestroy() {
    this.shouldShow = false
    setTimeout(() => {
      document.documentElement.style.setProperty('--small-header', 'var(--primary-black)')
    }, 500)
  }

  playTracks() {
    this.queueService.playAllFromIndex(this.tracks, 0, this.from)
  }

  pause() {
    if(this.queueService.currentTrackInfo() !== null) {
      this.queueService.currentTrackInfo()!.isBeingPlayed = false
      this._audioService.pause()
    }
  }

  continue() {
    if(this.queueService.currentTrackInfo() !== null) {
      this.queueService.currentTrackInfo()!.isBeingPlayed = true
      this._audioService.continue()
    }
  }
}
