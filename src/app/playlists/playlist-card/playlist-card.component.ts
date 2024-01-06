import {Component, Input} from '@angular/core';
import {Playlist} from "../interfaces/playlist";
import {AudioService} from "../../audio/audio.service";
import {Track} from "../../shared/interfaces/track";
import {From} from "../../shared/interfaces/from";
import {PlaylistService} from "../services/playlist.service";
import {UserService} from "../../user/services/user.service";

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent {
  @Input('playlist') playlist: Playlist = {} as Playlist

  constructor(private _audioService: AudioService,
              private _playlistService: PlaylistService,
              private _userService: UserService) {
  }
  playQueue(tracks: Track[]) {
    console.log(this.playlist)
    let from: From = {
      id : this.playlist.id,
      name: this.playlist.title,
      url: '/playlists/' + this.playlist.id
    }
    this._audioService.playQueue(tracks, from)
  }

  deletePlaylist(playlist: Playlist) {
    this._playlistService.deletePlaylist(playlist)
  }
}
