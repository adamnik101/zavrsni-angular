import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "./services/search.service";
import {Track} from "../shared/interfaces/track";
import {Subscription} from "rxjs";
import {SearchResult} from "./interfaces/search-result";
import {From} from "../shared/interfaces/from";
import {GenreService} from "../genre/services/genre.service";
import {Genre} from "../genre/interfaces/genre";
import {Title} from "@angular/platform-browser";
import { SpinnerFunctions } from '../core/static-functions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy{
  public response : SearchResult = {} as SearchResult;
  subs: Subscription = new Subscription();
  private _sub1!: Subscription
  public from!: From;
  genres: Genre[] = [];
  genreSub!: Subscription
  query: string  = ''
  loading: boolean = true;
  constructor(public _searchService: SearchService, private _title: Title, private _genreService: GenreService) {

  }

  ngOnInit() {
    this._title.setTitle('Search - TREBLE')
    this.getGenres();
    this.trackSearch();
  }

  getGenres(): void {
    SpinnerFunctions.showSpinner();
    this.subs.add(this._genreService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.data
        SpinnerFunctions.hideSpinner();
      },
      error: (err) => {
        SpinnerFunctions.hideSpinner();
      }
    }))
  }

  trackSearch(): void {
    this.subs.add(this._searchService.result$.subscribe({
      next: (result) => {
        this.response = result
        this.query = this._searchService.querySignal()
        this.from = {
          url : 'search',
          name: "search",
          id: ''
        }
      }
    }));
  }

  goToNextPaginatedPageTrack(nextPageUrl: string): void {
    this._searchService.changePagedResponsePage(nextPageUrl, 'track')
  }

  goToNextPaginatedPageArtist(nextPageUrl: string): void {
    this._searchService.changePagedResponsePage(nextPageUrl, 'artist')
  }

  goToNextPaginatedPageAlbum(nextPageUrl: string): void {
    this._searchService.changePagedResponsePage(nextPageUrl, 'album')
  }

  goToPreviousPaginatedPageAlbum(previousPageUrl: string): void {
    this._searchService.changePagedResponsePage(previousPageUrl, 'album', true)
  }

  goToPreviousPaginatedPageTrack(previousPageUrl: string): void {
    this._searchService.changePagedResponsePage(previousPageUrl, 'track', true)
  }

  goToPreviousPaginatedPageArtist(previousPageUrl: string): void {
    this._searchService.changePagedResponsePage(previousPageUrl, 'artist', true)
  }

  onGoToPageChange(type: 'tracks' | 'albums' | 'artists', page: any): void {
    switch (type) {
      case 'tracks': {
        this._searchService.track_page.set(page.value);
        this._searchService.goToPage(this._searchService.track_page(), 'track')
      } break;
      case 'albums': {
        this._searchService.album_page.set(page.value);
        this._searchService.goToPage(this._searchService.album_page(), 'album')
      } break;
      case 'artists': {
        this._searchService.artist_page.set(page.value);
        this._searchService.goToPage(this._searchService.artist_page(), 'artist')
      }break;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
