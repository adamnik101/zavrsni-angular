import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {UserService} from "../../user/services/user.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {MatDialog} from "@angular/material/dialog";
import {CreatePlaylistDialogComponent} from "../../playlists/create-playlist-dialog/create-playlist-dialog.component";
import {Artist} from "../../artists/interfaces/artist";
import {AuthService} from "../../auth/services/auth.service";
import {Album} from "../../albums/interfaces/album";
import {DragDropService} from "../../shared/services/drag-drop.service";
import {FormControl} from "@angular/forms";
import {PlaylistService} from "../../playlists/services/playlist.service";
import {QueueService} from "../../queue/services/queue.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  playlists: Playlist[] = []
  following: Artist[] = []
  albums: Album[] = []
  selected = new FormControl(0)
  constructor(public _userService: UserService,
              protected _playlistService: PlaylistService,
              private _matDialog: MatDialog,
              public authService: AuthService,
              public dragDropService: DragDropService,
              protected queueService: QueueService) {

  }
  ngOnInit() {

    this._userService.following$.subscribe({
      next: (artists) => {
        this.following = artists
      }
    })
    this._userService.likedAlbums$.subscribe({
      next: (albums) => {
        this.albums = albums
      }
    })
  }
  openDialog() {
    this._matDialog.open(CreatePlaylistDialogComponent).afterClosed().subscribe({
      next: (response: ResponseAPI<Playlist>) => {
        if (response) {
          console.log(response)
          this._playlistService.getPlaylists()
        }
      }
    })
  }

  openPlaylistsTab(event: MouseEvent) {
    if(this.dragDropService.dragging) {
      this.selected.setValue(0)
    }
  }
}
