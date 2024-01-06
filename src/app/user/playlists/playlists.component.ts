import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Title} from "@angular/platform-browser";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // manual
})
export class PlaylistsComponent implements OnInit{
  filtered : Playlist[] = []
  playlists: Playlist[] = []
  subs: Subscription[] = []
  constructor(public userService: UserService,private _playlistService: PlaylistService, private _cdr: ChangeDetectorRef, private _title: Title) {

  }
  ngOnInit(){
    this.subs.push(this._playlistService.playlists$.subscribe({
      next:(playlists) => {
        this.playlists = playlists
        this._title.setTitle(`My playlists - TREBLE`)
        this._cdr.markForCheck()
      }
    }))
  }

  filterPlaylists(query: string) {
    this.filtered = []
    this.subs.push(this._playlistService.playlists$.subscribe({
      next:(playlists) => {
        this.filtered = playlists.filter(playlist => playlist.title.toLowerCase().trim().includes(query.toLowerCase().trim()))
        this._cdr.markForCheck()
      }
    }))
  }
  ngOnDestroy() {
    for(let sub of this.subs) {
      sub.unsubscribe()
    }
  }
}
