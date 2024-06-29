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
import { UserRequestsService } from '../services/requests/user-requests.service';

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
  private userRequests = inject(UserRequestsService)
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
  public loading: boolean = true;
  totalDuration = signal<number>(0)
  likedSub!: Subscription
  ngOnInit() {
    this.loading = true
    this._title.setTitle("Liked Tracks - TREBLE")
    this.likedSub = this.userRequests.getUserLikedTracks(this.page, this.size).subscribe({
      next: (response) => {
        this._userService.likedTracks.set(response.data)
        this._trackLikeService.setInitialLikedTracks(response.data)
        this._trackDurationService.calculateTotalDurationOfTracks(response.data)
        this.loading = false
      }
    })
  }
  ngOnDestroy() {
    this.likedSub.unsubscribe()
  }
}
