import { Pipe, PipeTransform } from '@angular/core';
import {Playlist} from "../../playlists/interfaces/playlist";
import {Observable} from "rxjs";
import {From} from "../interfaces/from";

@Pipe({
  name: 'isPlaylistOwner',
  standalone: true
})
export class IsPlaylistOwnerPipe implements PipeTransform {

  transform(playlists: false | Playlist[] | null, from : From): boolean {
    if(playlists) {
      let isOwner =  playlists.find(playlist => {
        return playlist.id === from.id;
      })

      if(isOwner) return true
    }
    return false
  }

}
