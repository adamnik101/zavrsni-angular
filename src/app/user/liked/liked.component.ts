import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Track} from "../../shared/interfaces/track";
import {from, Subscription} from "rxjs";
import {From} from "../../shared/interfaces/from";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
})
export class LikedComponent implements OnInit{

  protected _userService = inject(UserService)
  private _cdr = inject(ChangeDetectorRef)
  private _title = inject(Title)
  public likedTracks: Track[] = []
  private _filteredTracks: Track[] = []
  loaded: boolean = false
  fromInfo: From = {
    name : 'Liked',
    id : '',
    url: '/user/liked'
  }
  private page = 1
  private size = 10
  public loading: boolean = false;
  likedSub!: Subscription
  ngOnInit() {
    this.likedSub = this._userService.getUserLikedTracks(this.page, this.size).subscribe({
      next: (tracks) => {
        //this._likedTracksSubject.next(tracks)
        this._userService.likedTracks.set(tracks)
        this.likedTracks = this._userService.likedTracks()
        this.loaded = true
      }
    })
    /*this._userService.likedTracks$.subscribe({
      next: (tracks) => {
        this.likedTracks = tracks
        this._title.setTitle('Liked tracks - TREBLE')
      }
    })*/
  }
  ngOnDestroy() {
    this.likedSub.unsubscribe()
  }
  filterLiked(query: string) {
    const q = query.toLowerCase().trim()
    this.filteredTracks = this.likedTracks.filter(track =>
      track.title.toLowerCase().trim().includes(q) ||
      track.owner.name.toLowerCase().includes(q) ||
      track.album?.name.toLowerCase().includes(q)
    )
  }
  get filteredTracks(): Track[] {
    return this._filteredTracks;
  }

  set filteredTracks(value: Track[]) {
    this._filteredTracks = value;
  }

  /*@HostListener('window:scroll', ['$event'])
  onScroll() {
    if(document.documentElement.scrollHeight - window.innerHeight <= window.scrollY && this._userService.likedTracks.length < this._userService.likedTracksTotal) {
      this.loadMore()
    }
  }

  private loadMore() {
    this.loading = true
    this._userService.getUserLikedTracks(++this.page, this.size).add(() => {
      this.loading = false
    })
  }*/
}
