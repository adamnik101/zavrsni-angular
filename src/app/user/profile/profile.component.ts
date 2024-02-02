import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";
import {Playlist} from "../../playlists/interfaces/playlist";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {ColorThiefService} from "../../shared/services/color-thief.service";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {Artist} from "../../artists/interfaces/artist";
import {MatDialog} from "@angular/material/dialog";
import {EditUserNameDialogComponent} from "./edit-user-name-dialog/edit-user-name-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  user : User = {} as User
  followings: Artist[] = []
  @ViewChild('cover') cover!: ElementRef
  @ViewChild('profileImage') profileImage!: ElementRef
  playlists : Playlist[] = []
  favoriteTracks:Track[] = []
  private _userSubscription: Subscription = new Subscription()
  private _recentlySub: Subscription = new Subscription()
  selectedFile: any | null = null
  profileImageSrc: string = ''
  from: From = {
    name : 'Favorite tracks',
    url: '/user/profile',
    id: ''
  }
  load: boolean = true
  constructor(public userService: UserService,
              private _playlistService: PlaylistService,
              private _titleService: Title,
              private _colorService: ColorThiefService,
              private _matDialog: MatDialog) { }

  ngOnInit() {
    this._titleService.setTitle('My Profile - TREBLE')
    this._userSubscription = this.userService.user$.subscribe({
      next: (user) => {
        this.user = user
        this._colorService.getRgbColorsFromImage(this.user.cover, "profile", true)
        console.log(user)
        this.load = !this.load
        if(user.cover) {
          this.profileImageSrc = `url(${user.cover})`
        }
      }
    })
    this._playlistService.playlists$.subscribe({
      next: (playlists) => {
        this.playlists = playlists
      }
    })
    this.userService.following$.subscribe({
      next: (artists) => {
        this.followings = artists
      }
    })
    this.userService.getFavoriteTracksInLast7Days().subscribe({
      next: (tracks) => {
        this.favoriteTracks = tracks
      }
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = (e) => {
        console.log(e)
        this._colorService.getRgbColorsFromImage(e.target?.result as string, "profile", true)
        this.profileImage.nativeElement.style.backgroundImage = `url(${e.target?.result})`
      };
    }
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {
    console.log('destroy')
    this._userSubscription.unsubscribe()
    this._recentlySub.unsubscribe()
    document.documentElement.style.setProperty('--header', 'var(--primary-black)')

  }

  openEditUsernameDialog() {
    this._matDialog.open(EditUserNameDialogComponent)
  }
}
