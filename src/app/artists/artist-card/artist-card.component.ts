import {Component, Input} from '@angular/core';
import {Artist} from "../interfaces/artist";

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent {
  @Input('index') index : number = 0
  @Input('artist') artist: Artist = {} as Artist
  @Input('trending') trending: boolean = false;
}
