import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ArtistService} from "../services/artist.service";
import {ActivatedRoute} from "@angular/router";
import {Artist} from "../interfaces/artist";
import {From} from "../../shared/interfaces/from";
import {UserService} from "../../user/services/user.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {Title} from "@angular/platform-browser";
import {ColorThiefService} from "../../shared/services/color-thief.service";
import {Subscription} from "rxjs";
import {Track} from "../../shared/interfaces/track";
import {QueueService} from "../../queue/services/queue.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { UserRequestsService } from 'src/app/user/services/requests/user-requests.service';
import { SpinnerFunctions } from 'src/app/core/static-functions';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)', opacity: 1})),
      transition('void => *', [
        style({  transform: 'translateY(-200px)', opacity: 0}),
        animate('0.3s ease-in-out')
      ]),
      transition('* => void', [
        animate('0.3s ease-in-out', style({  transform: 'translateY(-200px)', opacity: 0}))
      ])
    ])
  ]
})
export class ArtistDetailComponent implements OnInit {

  constructor(private _artistService: ArtistService,
    private _route: ActivatedRoute,
    protected _userService: UserService,
    private _snackbarService: SnackbarService,
    private _title: Title,
    private _renderer: Renderer2,
    private _colorService: ColorThiefService,
    private _queueService: QueueService,
    private el: ElementRef,
    private userRequests: UserRequestsService
  ) { }
  
  showSmallHeader: boolean = false
  artist: Artist = {} as Artist
  @ViewChild('top') top!: ElementRef
  @ViewChild('bottom') bottom!: ElementRef
  fromFeatures: From = { } as From
  fromPopular: From = { } as From
  isFollowing: boolean = false
  followings: Artist[] = []
  subs: Subscription[] = []
  initSub?: Subscription
  subscription: Subscription = new Subscription();
  ngOnInit() {
    this.getArtist()
  }

  getArtist() {
    SpinnerFunctions.showSpinner();
    this.subscription.add(
      this._route.paramMap.subscribe({
        next: (response) => {
          document.documentElement.style.setProperty('--header', `var(--primary-black)`)
          const id = response.get('id')
          if(id){
            this.subscription.add(this._artistService.getArtist(id).subscribe({
              next: (response) => {
                this.artist = response.data
                this.top.nativeElement.style.background = `
                linear-gradient(90deg, var(--black), transparent 100%),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.5), var(--black)), url('${response.data.cover}') center/cover no-repeat`
                this._colorService.getRgbColorsFromImage(response.data.cover, 'artist', true)
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
                this.subscription.add(this._userService.following$.subscribe({
                  next: (artists) => {
                    this.isFollowing = artists.findIndex(ar => ar.id === response.data.id) !== -1
                    this.followings = artists
                    this._title.setTitle(`${response.data.name} - TREBLE`)
                  }
                }))
                SpinnerFunctions.hideSpinner();
              },
              error: (err) => {
                //
                SpinnerFunctions.hideSpinner();
              }
            }))
          }
        },
        error: (response) => {
          //
          SpinnerFunctions.hideSpinner();
        }
      })
    );
  }

  followArtist(artist: Artist) {
    this.subscription.add(this.userRequests.followArtist(artist).subscribe({
      next: (response) => {
        this._snackbarService.showDefaultMessage(response.message)
        this.followings.unshift(artist)
        this._userService.updateFollowing(this.followings)
        this.artist.followed_by_count++

      }, error: (response) => {
        this._snackbarService.showFailedMessage(response.error)
      }
    }))
  }

  unfollowArtist(artist: Artist) {
    this.subscription.add(this.userRequests.unfollowArtist(artist).subscribe({
      next: (response) => {
        this._snackbarService.showDefaultMessage('Removed from your followings.')
        const artistToDelete = this.followings.findIndex(ar => ar.id === artist.id)
        if(artistToDelete != -1) {
          this.followings.splice(artistToDelete, 1)
          this.artist.followed_by_count--
        }
        this._userService.updateFollowing(this.followings)
        this.isFollowing = false
      },
      error: (response) => {
        this._snackbarService.showFailedMessage(response.error)
      }
    }))
  }

  ngOnDestroy() {
    document.documentElement.style.setProperty('--header', `var(--primary-black)`)
    this.subscription.unsubscribe();
  }

  playFeaturedTracks(tracks: Track[]) {
    this._queueService.playAllFromIndex(tracks, 0, this.fromFeatures)
  }

  playPopularTracks(tracks: Track[]) {
    this._queueService.playAllFromIndex(tracks, 0, this.fromPopular)

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const distanceToTop = this.el.nativeElement.getBoundingClientRect().top
    this.showSmallHeader = distanceToTop < -200
  }
}
