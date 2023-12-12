import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // manual
})
export class PlaylistsComponent implements OnInit{
  filtered : Playlist[] = []
  playlists: Playlist[] = []

  constructor(public userService: UserService, private _cdr: ChangeDetectorRef, private _title: Title) {

  }
  ngOnInit(){
    this.userService.playlists$.subscribe({
      next:(playlists) => {
        this.playlists = playlists

        this._cdr.markForCheck()
        this._title.setTitle(`My playlists - TREBLE`)
      }
    })

  }

  filterPlaylists(query: string) {
    this.filtered = []
    this.userService.playlists$.subscribe({
      next:(playlists) => {
        this.filtered = playlists.filter(playlist => playlist.title.toLowerCase().trim().includes(query.toLowerCase().trim()))
      }
    })
    this._cdr.markForCheck()
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
