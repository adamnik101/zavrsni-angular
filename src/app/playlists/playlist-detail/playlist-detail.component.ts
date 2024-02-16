import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  signal,
  ViewChild
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../services/playlist.service";
import {Playlist} from "../interfaces/playlist";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {From} from "../../shared/interfaces/from";
import {Title} from "@angular/platform-browser";
import {Track} from "../../shared/interfaces/track";
import {formatDate} from "@angular/common";
import {ColorThiefService} from "../../shared/services/color-thief.service";
import {QueueService} from "../../queue/services/queue.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TrackDurationService} from "../../shared/services/track-duration.service";

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss'],
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
export class PlaylistDetailComponent implements OnInit{
  isLoaded:boolean = false
  @ViewChild('background') background!: ElementRef
  fromInfo : From = {} as From
  tracks : Track[] = []
  #playlist = signal<Playlist | null>(null)
  playlist = computed(this.#playlist)
  private subs: Subscription[] = []
  showSmallHeader: boolean = false
  constructor(private _route: ActivatedRoute,
              public playlistService: PlaylistService,
              private _title: Title,
              private _renderer: Renderer2,
              private _colorService: ColorThiefService,
              private _queueService: QueueService,
              private el: ElementRef,
              protected _trackDurationService: TrackDurationService) {
  }
  ngOnInit(): void {

    this.subs.push(this._route.paramMap.subscribe({
      next: (params) => {
        this.#playlist.set(null)
        this.isLoaded = false
        document.documentElement.style.setProperty('--header', 'var(--primary-black)')
        document.documentElement.style.setProperty('--playlist', 'linear-gradient(#212121, #000)')
        const id = params.get('id')
        if(id) {
          /*this._playlistService.loadMoreTracks(id).add(() => {
            this._playlistService.tracks$.subscribe({
              next: (tracks) => {
                this.tracks = tracks
              }
            })
          })*/
          this.subs.push(this.playlistService.showPlaylist(id).subscribe({
            next: (response) => {
              this.#playlist.set(response.data)
              this.playlistService.updatePlaylistTracksSubject(response.data.tracks)

              if(response.data.image_url){
                this._colorService.getRgbColorsFromImage(response.data.image_url,'playlist', true)

              }

              //this.background.nativeElement.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.72), #000), url('${this.playlist.image_url}')`
              if(this.playlist() !== null) {
                this.fromInfo = {
                  id: this.playlist()!.id,
                  name: this.playlist()!.title,
                  url: 'playlists/' + id,
                  imageFrom: this.playlist()!.image_url
                };
                this._title.setTitle(`${this.playlist()!.title} - TREBLE`)

                this.playlistService.totalDuration.set(0)
                this._trackDurationService.calculateTotalDurationOfTracks(this.playlist()?.tracks!)

                this.playlistService.trackCount.set(response.data.tracks_count)
                // for (let track of this.playlist()!.tracks.data) {
                //   console.log(track)
                //   totalDuration += track.duration - Math.floor(track.duration % 1)
                //   console.log(totalDuration)
                // }
                // console.log(totalDuration)

                //this.playlistService.totalDuration.set(totalDuration)
                this.isLoaded = true
              }
            }
          }))
        }
      }
    }))
  }
  // set playlist(value: Playlist) {
  //   this.playlistService.playlist = value
  // }
  // get playlist() {
  //   return this.playlistService.playlist
  // }
  ngOnDestroy() {
    document.documentElement.style.setProperty('--header', 'var(--primary-black)')
    for (let sub of this.subs) {
      sub.unsubscribe()
    }
  }
  /*@HostListener('window:scroll', ['$event'])
  onScroll() {
    if(document.documentElement.scrollHeight - window.innerHeight <= window.scrollY) {
      this.loadMore()
    }
  }

  private loadMore() {
    this._playlistService.loadMoreTracks(this.playlist.id)
  }*/
  playTracks() {
    if(this.playlist() !== null) {
      this._queueService.playAllFromIndex(this.playlist()!.tracks, 0, this.fromInfo)
    }
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const distanceToTop = this.el.nativeElement.getBoundingClientRect().top
    this.showSmallHeader = distanceToTop < -200
  }
}
