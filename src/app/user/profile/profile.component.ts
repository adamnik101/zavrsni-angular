import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";
import {Playlist} from "../../playlists/interfaces/playlist";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  user : User = {} as User
  playlists : Playlist[] = []
  favoriteTracks:Track[] = []
  private _userSubscription: Subscription = new Subscription()
  private _recentlySub: Subscription = new Subscription()
  from: From = {
    name : 'Favorite tracks',
    url: '/user/profile',
    id: ''
  }
  load: boolean = true
  constructor(public userService: UserService, private _titleService: Title) { }

  ngOnInit() {
    this._titleService.setTitle('My Profile - TREBLE')

    this._userSubscription = this.userService.user$.subscribe({
      next: (user) => {
        this.user = user

        console.log(user)
        this.load = !this.load
      }
    })
    this.userService.playlists$.subscribe({
      next: (playlists) => {
        this.playlists = playlists
      }
    })
    this.userService.getFavoriteTracksInLast7Days().subscribe({
      next: (tracks) => {
        this.favoriteTracks = tracks

      }
    })
  }

  ngOnDestroy() {
    console.log('destroy')
    this._userSubscription.unsubscribe()
    this._recentlySub.unsubscribe()
  }
}
