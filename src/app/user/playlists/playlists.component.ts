import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Title} from "@angular/platform-browser";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {Subscription} from "rxjs";
import {CreatePlaylistDialogComponent} from "../../playlists/create-playlist-dialog/create-playlist-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ResponseAPI} from "../../shared/interfaces/response-api";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default // manual
})
export class PlaylistsComponent implements OnInit{
  playlists: Playlist[] = []
  subs: Subscription[] = []
  constructor(public userService: UserService,
              protected _playlistService: PlaylistService,
              private _cdr: ChangeDetectorRef,
              private _title: Title,
              private _dialog: MatDialog) {

  }
  ngOnInit(){
  }

  filterPlaylists() {
    this._playlistService.filterPlaylists()
    this._cdr.markForCheck()

  }
  ngOnDestroy() {
    for(let sub of this.subs) {
      sub.unsubscribe()
    }
  }

  openCreatePlaylistDialog() {
    this._dialog.open(CreatePlaylistDialogComponent).afterClosed().subscribe({
      next: (response: ResponseAPI<Playlist>) => {
        const playlists = this._playlistService.playlists().concat([response.data])
        this._playlistService.playlists.set(playlists)
        this.filterPlaylists()
        this._cdr.markForCheck()
        console.log(playlists)
      }
    })
  }
}
