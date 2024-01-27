import {Component, Input} from '@angular/core';
import {Album} from "../interfaces/album";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-album-list-item',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './album-list-item.component.html',
  styleUrl: './album-list-item.component.scss'
})
export class AlbumListItemComponent {
  @Input('album') album: Album = {} as Album
}
