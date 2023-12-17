import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ArtistService} from "../services/artist.service";
import {ActivatedRoute} from "@angular/router";
import {Artist} from "../interfaces/artist";
import {From} from "../../shared/interfaces/from";
import {UserService} from "../../user/services/user.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {Title} from "@angular/platform-browser";
import {ColorThiefService} from "../../shared/services/color-thief.service";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  artist: Artist = {} as Artist
  @ViewChild('top') top!: ElementRef
  @ViewChild('bottom') bottom!: ElementRef
  fromFeatures: From = { } as From
  fromPopular: From = { } as From
  loaded: boolean = false;
  isFollowing: boolean = false
  followings: Artist[] = []
  constructor(private _artistService: ArtistService,
              private _route: ActivatedRoute,
              private _userService: UserService,
              private _snackbarService: SnackbarService,
              private _title: Title,
              private _renderer: Renderer2,
              private _colorService: ColorThiefService) {
  }
  ngOnInit() {
    this.loaded = false
    this.getArtist()
  }
  getArtist() {
    const subRoute = this._route.paramMap.subscribe({
      next: (response) => {
        this.loaded = false
        const id = response.get('id')
        if(id){
          const subArtist = this._artistService.getArtist(id).subscribe({
            next: (artist) => {
              this.artist = artist
              console.log(artist)
              this.top.nativeElement.style.background = `
              linear-gradient(90deg, var(--black), transparent 100%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.5), var(--black)), url('${artist.cover}') center/cover no-repeat`
              this._colorService.getRgbColorsFromImage(artist.cover, 'artist', true)
              this.fromFeatures = {
                id: this.artist.id,
                name: this.artist.name + '\'s features',
                url: '/artists/' + this.artist.id
              }
              this.fromPopular = {
                id: this.artist.id,
                name: this.artist.name + '\'s popular',
                url: '/artists/' + this.artist.id
              }
              this._userService.following$.subscribe({
                next: (artists) => {
                  this.isFollowing = artists.findIndex(ar => ar.id === artist.id) !== -1
                  this.followings = artists
                  this.loaded = true
                  this._title.setTitle(`${artist.name} - TREBLE`)
                }
              })


            },
            error: (err) => {
              //
            },
            complete() {
              subArtist.unsubscribe()
            }
          })
        }
      },
      error: (response) => {
        //
      },
      complete() {
        subRoute.unsubscribe()
      }
    })
  }
  followArtist(artist: Artist) {
    const sub = this._userService.followArtist(artist).subscribe({
      next: (response) => {
        this._snackbarService.showSuccessMessage(response as string)
        this.followings.unshift(artist)
        this._userService.updateFollowing(this.followings)

      }, error: (response) => {
        this._snackbarService.showFailedMessage(response.error)
      },
      complete() {
        sub.unsubscribe()
      }
    })
  }

  unfollowArtist(artist: Artist) {
    const sub = this._userService.unfollowArtist(artist).subscribe({
      next: (response) => {
        this._snackbarService.showSuccessMessage('Unfollowed')
        const artistToDelete = this.followings.findIndex(ar => ar.id === artist.id)
        if(artistToDelete != -1) {
          this.followings.splice(artistToDelete, 1)
        }
        this._userService.updateFollowing(this.followings)
        this.isFollowing = false
      },
      error: (response) => {
        this._snackbarService.showFailedMessage(response.error)
      },
      complete() {
        sub.unsubscribe()
      }
    })
  }
  ngOnDestroy() {
    document.documentElement.style.setProperty('--header', `var(--primary-black)`)
  }
}
