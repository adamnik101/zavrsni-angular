import {Component, Input} from '@angular/core';
import {Album} from "../interfaces/album";

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  @Input('album') album: Album = {} as Album

  ngOnInit(): void {
    console.log(this.album)
  }
}
