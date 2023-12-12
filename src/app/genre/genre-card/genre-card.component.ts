import {Component, inject, Input} from '@angular/core';
import {Genre} from "../interfaces/genre";

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent {
  @Input('genre') genre : Genre = {} as Genre
}
