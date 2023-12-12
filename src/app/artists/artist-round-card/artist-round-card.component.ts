import {Component, Input} from '@angular/core';
import {Artist} from "../interfaces/artist";

@Component({
  selector: 'app-artist-round-card',
  templateUrl: './artist-round-card.component.html',
  styleUrls: ['./artist-round-card.component.scss']
})
export class ArtistRoundCardComponent {
 @Input('artist') artist : Artist = {} as Artist
}
