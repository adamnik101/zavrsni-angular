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

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit{
  isLoaded:boolean = false
  @ViewChild('background') background!: ElementRef
  fromInfo : From = {} as From
  tracks : Track[] = []
  #playlist = signal<Playlist | null>(null)
  playlist = computed(this.#playlist)
  private subs: Subscription[] = []

  constructor(private _route: ActivatedRoute,
              public playlistService: PlaylistService,
              private _title: Title,
              private _renderer: Renderer2,
              private _colorService: ColorThiefService,
              private _queueService: QueueService) {
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
              this.#playlist.set(response)
              this.playlistService.updatePlaylistTracksSubject(response.tracks.data)

              if(response.image_url){
                this._colorService.getRgbColorsFromImage(response.image_url,'playlist', true)

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
                let totalDuration = 0
                this.playlistService.trackCount.set(response.tracks_count)
                this.playlistService.totalDuration.set(0)
                for (let track of this.playlist()!.tracks.data) {
                  totalDuration += Math.floor(track.duration) - Math.floor(track.duration % 1000)
                }
                this.playlistService.totalDuration.set(totalDuration)
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
      this._queueService.playAllFromIndex(this.playlist()!.tracks.data, 0, this.fromInfo)
    }
  }
}
