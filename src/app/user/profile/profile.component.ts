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
import {SnackbarService} from "../../shared/services/snackbar.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {ResponseError} from "../../shared/interfaces/response-error";
import { UserRequestsService } from '../services/requests/user-requests.service';

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
  public loadingImage: boolean = false;
  constructor(public userService: UserService,
              protected _playlistService: PlaylistService,
              private _titleService: Title,
              private _colorService: ColorThiefService,
              private _matDialog: MatDialog,
              private _snackbar: SnackbarService,
              private userRequests: UserRequestsService) { }

  ngOnInit() {
    this._titleService.setTitle('My Profile - TREBLE')
    this._userSubscription = this.userService.user$.subscribe({
      next: (user) => {
        if(user) {
          this.user = user
          if (user.cover) {
            this._colorService.getRgbColorsFromImage(this.user.cover, "profile", true)
          }
          console.log(user)
          this.load = !this.load
          if(user.cover) {
            this.profileImageSrc = `url(${user.cover})`
          }
        }
      }
    })
    this.userService.following$.subscribe({
      next: (artists) => {
        this.followings = artists
      }
    })
  }
  onFileSelected(event: any) {

    this.selectedFile = event.target.files[0] ?? null
    if (this.selectedFile) {
      this.loadingImage = true
      this.userRequests.updateCover(this.selectedFile).subscribe({
        next: (response) => {
          this._snackbar.showDefaultMessage(response.message)
          const reader = new FileReader();
          reader.readAsDataURL(this.selectedFile);

          reader.onload = (e) => {
            console.log(e.target?.result)
            this._colorService.getRgbColorsFromImage(e.target?.result as string, "profile", true)
            this.profileImage.nativeElement.style.backgroundImage = `url(${e.target?.result})`
            this.profileImageSrc = e.target!.result as string
            this.user.cover = this.profileImageSrc
            this.loadingImage = false
          };
        },
        error: (err) => {
          let responseError = err.error as ResponseAPI<string>
          this._snackbar.showDefaultMessage(responseError.message)
          this.loadingImage = false
        }
      })

    }
  }
  ngOnDestroy() {
    console.log('destroy')
    this._userSubscription.unsubscribe()
    this._recentlySub.unsubscribe()
    document.documentElement.style.setProperty('--header', 'var(--primary-black)')

  }

  openEditUsernameDialog() {
    this._matDialog.open(EditUserNameDialogComponent, {data: this.user}).afterClosed().subscribe({
      next: (username) => {
        if (username) {
          this.user.username = username
        }
      }
    })
  }
}
