import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {UserService} from "../services/user.service";
import {Track} from "../../shared/interfaces/track";
import {from, Subscription} from "rxjs";
import {From} from "../../shared/interfaces/from";
import {Title} from "@angular/platform-browser";
import {TrackDurationService} from "../../shared/services/track-duration.service";
import {TrackLikeService} from "../../shared/services/track-like.service";

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
})
export class LikedComponent implements OnInit{

  protected _userService = inject(UserService)
  private _cdr = inject(ChangeDetectorRef)
  private _title = inject(Title)
  protected _trackDurationService = inject(TrackDurationService)
  protected _trackLikeService = inject(TrackLikeService)
  public likedTracks: Track[] = []
  private _filteredTracks: Track[] = []
  loaded: boolean = false
  fromInfo: From = {
    name : 'Liked',
    id : '',
    url: '/user/liked'
  }
  private page = 1
  private size = 10
  public loading: boolean = false;
  totalDuration = signal<number>(0)
  likedSub!: Subscription
  ngOnInit() {
    this.likedSub = this._userService.getUserLikedTracks(this.page, this.size).subscribe({
      next: (response) => {
        this._trackLikeService.setInitialLikedTracks(response.data)
        this._trackDurationService.calculateTotalDurationOfTracks(response.data)
        this.loaded = true
      }
    })
  }
  ngOnDestroy() {
    this.likedSub.unsubscribe()
  }
}
