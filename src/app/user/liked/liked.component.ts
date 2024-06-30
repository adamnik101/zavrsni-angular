import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {UserService} from "../services/user.service";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {Title} from "@angular/platform-browser";
import {TrackDurationService} from "../../shared/services/track-duration.service";
import {TrackLikeService} from "../../shared/services/track-like.service";
import { UserRequestsService } from '../services/requests/user-requests.service';
import { SpinnerFunctions } from 'src/app/core/static-functions';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
})
export class LikedComponent implements OnInit, OnDestroy{

  protected _userService = inject(UserService)
  private _title = inject(Title)
  protected _trackDurationService = inject(TrackDurationService)
  protected _trackLikeService = inject(TrackLikeService)
  private userRequests = inject(UserRequestsService)
  public likedTracks: Track[] = []
  fromInfo: From = {
    name : 'Liked',
    id : '',
    url: '/user/liked'
  }
  private page = 1
  private size = 10
  public loading: boolean = true;
  totalDuration = signal<number>(0)

  ngOnInit(): void {
    this._title.setTitle("Liked Tracks - TREBLE")
    this.getLikedTracks();
  }

  getLikedTracks(): void {
    SpinnerFunctions.showSpinner();
    this.userRequests.getUserLikedTracks(this.page, this.size).subscribe({
      next: (response) => {
        this._userService.likedTracks.set(response.data)
        this._trackLikeService.setInitialLikedTracks(response.data)
        this._trackDurationService.calculateTotalDurationOfTracks(response.data)
        SpinnerFunctions.hideSpinner();
      },
      error: (err) => {
        SpinnerFunctions.hideSpinner();
      }
    })
  }

  ngOnDestroy(): void { 
    
  }
}
