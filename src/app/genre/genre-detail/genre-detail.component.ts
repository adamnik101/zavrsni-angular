import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {GenreService} from "../services/genre.service";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Genre} from "../interfaces/genre";

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.scss']
})
export class GenreDetailComponent {
  private _routeSub! : Subscription
  private _genreSub! : Subscription

  public playlists: Playlist[] = []
  public genre: Genre = {} as Genre
  constructor(private _router: ActivatedRoute, private _genreService: GenreService) {
  }
  ngOnInit() {
    this._routeSub = this._router.paramMap.subscribe({
      next: (paramMap) => {
        const id = paramMap.get('id')
        if(id) {
          this._genreSub = this._genreService.getGenre(id).subscribe({
            next: (response) => {
              this.playlists = response.data.playlists as Playlist[]
              this.genre = response.data as Genre
            }
          })
        }
      }
    })
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe()
    this._genreSub.unsubscribe()
  }
}
