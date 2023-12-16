import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";
import {Playlist} from "../../playlists/interfaces/playlist";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {ColorThiefService} from "../../shared/services/color-thief.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  user : User = {} as User
  @ViewChild('cover') cover!: ElementRef
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
  constructor(public userService: UserService, private _titleService: Title, private _colorService: ColorThiefService, private _renderer: Renderer2) { }

  ngOnInit() {
    this._titleService.setTitle('My Profile - TREBLE')

    this._userSubscription = this.userService.user$.subscribe({
      next: (user) => {
        this.user = user
        this._colorService.getRgbColorsFromImage(this._renderer, this.user.cover, this.cover, true)
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
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    console.log('destroy')
    this._userSubscription.unsubscribe()
    this._recentlySub.unsubscribe()
  }
}
