import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Genre} from "../genre/interfaces/genre";
import {GenreService} from "../genre/services/genre.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy{
  genres: Genre[] = []
  sub!: Subscription
  constructor(private _genreService: GenreService) {
  }
  ngOnInit() {
    this.sub = this._genreService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.data
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
