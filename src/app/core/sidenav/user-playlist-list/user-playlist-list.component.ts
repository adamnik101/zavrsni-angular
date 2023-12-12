import {Component, Input} from '@angular/core';
import {Playlist} from "../../../playlists/interfaces/playlist";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {Track} from "../../../shared/interfaces/track";

@Component({
  selector: 'app-user-playlist-list',
  templateUrl: './user-playlist-list.component.html',
  styleUrls: ['./user-playlist-list.component.scss']
})
export class UserPlaylistListComponent {
  @Input('playlist') playlist : Playlist = {} as Playlist
  track: Track = {} as Track;

  playPlaylist(playlist: Playlist) {

  }

  dropped(id: string, $event: CdkDragDrop<any, any>) {
    console.log(id)
  }
}
