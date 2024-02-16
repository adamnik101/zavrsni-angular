import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Track} from "../../shared/interfaces/track";
import {DurationPipe} from "../../shared/pipes/duration.pipe";
import {TrackLikeService} from "../../shared/services/track-like.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { From } from 'src/app/shared/interfaces/from';
import {TrackDurationService} from "../../shared/services/track-duration.service";
import {MatRippleModule} from "@angular/material/core";
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {TrackRowMenuComponent} from "../track-row-menu/track-row-menu.component";
import {RowMenuService} from "../services/row-menu.service";

@Component({
  selector: 'app-track-row',
  standalone: true,
  imports: [
    DurationPipe,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatMenuModule,
    RouterLink,
    TrackRowMenuComponent
  ],
  templateUrl: './track-row.component.html',
  styleUrl: './track-row.component.scss'
})
export class TrackRowComponent {
  @Input() track!: Track;
  @Input() index!: number;
  @Input() from!: From;
  @ViewChild('indexRef') indexRef!: ElementRef
  @ViewChild('row') row!: ElementRef

  constructor(public trackLikeService: TrackLikeService,
              private _totalDurationService: TrackDurationService,
              protected _trackRowService: RowMenuService) { }

  ngAfterViewInit() {
    if(!this.from.url.includes('albums/')) {
      this.indexRef.nativeElement.style.backgroundImage = `url("${this.track.cover}")`
    }
  }
  likeTrack(track: Track) {
    this.trackLikeService.addTrackToLiked(track)
  }

  unlikeTrack(track: Track) {
    console.log(this.from)
    this.trackLikeService.deleteTrackFromLiked(track.id)
    if(this.from.url.includes('/liked')) {
      this._totalDurationService.totalDuration.update(duration => {
        duration -= Number(track.duration)
        return duration
      })
    }
  }


  openMenuOnRightClick(event: MouseEvent, track: Track) {
    this._trackRowService.openMenuOnRightClick(event,track)
  }

}
