import {Component, Input} from '@angular/core';
import {Playlist} from "../interfaces/playlist";

@Component({
  selector: 'app-public-playlist-card',
  templateUrl: './public-playlist-card.component.html',
  styleUrls: ['./public-playlist-card.component.scss']
})
export class PublicPlaylistCardComponent {
  @Input('playlist') playlist : Playlist = {} as Playlist
}
