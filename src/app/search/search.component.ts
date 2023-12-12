import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "./services/search.service";
import {Track} from "../shared/interfaces/track";
import {Subscription} from "rxjs";
import {SearchResult} from "./interfaces/search-result";
import {From} from "../shared/interfaces/from";
import {GenreService} from "../genre/services/genre.service";
import {Genre} from "../genre/interfaces/genre";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy{
  public response : SearchResult = {} as SearchResult
  private _sub1!: Subscription
  public from!: From;
  genres: Genre[] = [];
  genreSub!: Subscription
  query: string  = ''
  constructor(private _searchService: SearchService, private _title: Title, private _genreService: GenreService) {

  }

  ngOnInit() {
    this._title.setTitle('Search - TREBLE')
    this.genreSub = this._genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres
      }
    })
    this._sub1 =  this._searchService.result$.subscribe({
      next: (result) => {
        this.response = result
        this.query = this._searchService.querySignal()
        console.log(result)
        this.from = {
          url : 'search',
          name: "search",
          id: ''
        }
      }
    })
  }

  ngOnDestroy() {
    this._sub1.unsubscribe()
    this.genreSub.unsubscribe()
  }

  goToNextPaginatedPageTrack(nextPageUrl: string) {
    this._searchService.changePagedResponsePage(nextPageUrl, 'track')
  }
  goToNextPaginatedPageArtist(nextPageUrl: string) {
    this._searchService.changePagedResponsePage(nextPageUrl, 'artist')
  }
  goToNextPaginatedPageAlbum(nextPageUrl: string) {
    this._searchService.changePagedResponsePage(nextPageUrl, 'album')
  }
  goToPreviousPaginatedPageAlbum() {
    this._searchService.goToPreviousPagedResponse('album')
  }
  goToPreviousPaginatedPageTrack() {
    this._searchService.goToPreviousPagedResponse('track')
  }
  goToPreviousPaginatedPageArtist() {
    this._searchService.goToPreviousPagedResponse('artist')
  }
}
