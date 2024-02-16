import {Component, ElementRef, HostListener, inject, signal, ViewChild} from '@angular/core';
import {AlbumService} from "../services/album.service";
import {ActivatedRoute} from "@angular/router";
import {Album} from "../interfaces/album";
import {From} from "../../shared/interfaces/from";
import {Track} from "../../shared/interfaces/track";
import {QueueService} from "../../queue/services/queue.service";
import {AudioService} from "../../audio/audio.service";
import {ColorThiefService} from "../../shared/services/color-thief.service";
import {UserService} from "../../user/services/user.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {Subscription} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TrackDurationService} from "../../shared/services/track-duration.service";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
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
export class AlbumDetailComponent {
  private _albumService = inject(AlbumService)
  private _queueService = inject(QueueService)
  private _audioService = inject(AudioService)
  private _colorService = inject(ColorThiefService)
  protected _userService = inject(UserService)
  private _route = inject(ActivatedRoute)
  private _snackbar = inject(SnackbarService)
  private el = inject(ElementRef)
  protected _trackDuration = inject(TrackDurationService)
  public album: Album = {} as Album
  public from : From = {} as From
  public isAlbumLiked: boolean = false
  public isLoaded: boolean = false
  private likedAlbums: Album[] = []
  @ViewChild('background') background!: ElementRef
  private subs: Subscription[] = []
  shouldShowHeader: boolean = false;
  totalDuration = signal<number>(0)
  ngOnInit() {

    this.getAlbum()
    this.subs.push(this._userService.likedAlbums$.subscribe({
      next: (albums) => {
        this.likedAlbums = albums
      }
    }))
  }

  private getAlbum() {
    this.subs.push(this._route.paramMap.subscribe({
      next: (paramMap) => {
        document.documentElement.style.setProperty('--header', 'var(--primary-black)')
        this.isLoaded = false
        this.isAlbumLiked = false
        const id = paramMap.get('id')
        if(id) {
          this.subs.push(this._userService.likedAlbums$.subscribe({
            next: (albums) => {
              for (let album of albums) {
                if(album.id === id) {
                  this.isAlbumLiked = true
                }
              }
            }
          }))
          this.subs.push(this._albumService.getAlbum(id).subscribe({
            next: (response) => {
              this.album = response.data
              this.from = {
                name : this.album.name,
                url: `/albums/${this.album.id}`,
                id: this.album.id,
                imageFrom: this.album.cover
              };

              console.log(response)
              this._colorService.getRgbColorsFromImage(this.album.cover, "album" ,true)
              this.totalDuration.set(0)
              this._trackDuration.calculateTotalDurationOfTracks(response.data.tracks)
              this.isLoaded = true
              this.background.nativeElement.style.background = `
              linear-gradient(90deg, var(--black), transparent 100%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.5), var(--black)), url('${this.album.cover}') right/600px repeat-x`
            }
          }))
        }
      }
    }))
  }

  playAlbum(tracks: Track[]) {
    this._queueService.playAllFromIndex(tracks, 0, this.from)
  }
  likeAlbum(id: string) {
    this.isAlbumLiked = true
    this.subs.push(this._albumService.likeAlbum(id).subscribe({
      next: (response) => {
        this._userService.updateLikedAlbums(response.albums)
      }
    }))
    this._snackbar.showDefaultMessage(`Added '${this.album.name}' to library.`)
  }

  removeAlbumFromLiked(id: string) {
    this.isAlbumLiked = false
    this._snackbar.showDefaultMessage(`Removed '${this.album.name}' from library.`)
    this.subs.push(this._albumService.removeFromLiked(id).subscribe({
      next: (response) => {
        if(response === null) {
          let without: Album[] = []
          for (let album of this.likedAlbums) {
            if(album.id !== id) {
              without.push(album)
            }
          }

          this._userService.updateLikedAlbums(without)
        }
      }
    }))
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const distanceToTop = this.el.nativeElement.getBoundingClientRect().top
    this.shouldShowHeader = distanceToTop < -200
  }
  ngOnDestroy() {
    document.documentElement.style.setProperty('--header', 'var(--primary-black)')
    this.isAlbumLiked = false
    for (let sub of this.subs) {
      sub.unsubscribe()
    }
  }

}
