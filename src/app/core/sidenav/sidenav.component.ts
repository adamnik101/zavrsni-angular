import { Component } from '@angular/core';
import {UserService} from "../../user/services/user.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {MatDialog} from "@angular/material/dialog";
import {CreatePlaylistDialogComponent} from "../../playlists/create-playlist-dialog/create-playlist-dialog.component";
import {Artist} from "../../artists/interfaces/artist";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  playlists: Playlist[] = []
  following: Artist[] = []
  constructor(public _userService: UserService,
              private _matDialog: MatDialog,
              public authService: AuthService) {

  }
  ngOnInit() {
    this._userService.playlists$.subscribe({
      next: (playlists) => {
        this.playlists = playlists
      }
    })
    this._userService.following$.subscribe({
      next: (artists) => {
        this.following = artists
      }
    })
  }
  openDialog() {
    this._matDialog.open(CreatePlaylistDialogComponent).afterClosed().subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
}
