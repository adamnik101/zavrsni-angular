import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../services/playlist.service";
import {Playlist} from "../interfaces/playlist";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {From} from "../../shared/interfaces/from";
import {Title} from "@angular/platform-browser";
import {Track} from "../../shared/interfaces/track";
import {formatDate} from "@angular/common";

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

  constructor(private _route: ActivatedRoute, public playlistService: PlaylistService, private _title: Title) {
  }
  ngOnInit(): void {

    this._route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')
        if(id) {
          /*this._playlistService.loadMoreTracks(id).add(() => {
            this._playlistService.tracks$.subscribe({
              next: (tracks) => {
                this.tracks = tracks
              }
            })
          })*/
          this.playlistService.showPlaylist(id).subscribe({
            next: (response) => {
              this.playlist = response
              this.isLoaded = true
              this.background.nativeElement.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.72), #000), url('${this.playlist.image_url}')`
              this.fromInfo = {
                id: this.playlist.id,
                name: this.playlist.title,
                url: 'playlists/' + id,
                imageFrom: this.playlist.image_url
              };
              this._title.setTitle(`${this.playlist.title} - TREBLE`)

              let totalDuration = 0
              this.playlistService.totalDuration.set(0)
              for (let track of response.tracks.data) {
                totalDuration += Math.floor(track.duration) - Math.floor(track.duration % 1000)
              }
              this.playlistService.totalDuration.set(totalDuration)

            }
          })
        }
      }
    })
  }
  set playlist(value: Playlist) {
    this.playlistService.playlist = value
  }
  get playlist() {
    return this.playlistService.playlist
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
}
