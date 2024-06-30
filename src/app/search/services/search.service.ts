import {inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BaseService} from "../../core/services/base.service";
import {HttpHeaders} from "@angular/common/http";
import {SearchResult} from "../interfaces/search-result";
import {Router} from "@angular/router";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {Artist} from "../../artists/interfaces/artist";
import {Track} from "../../shared/interfaces/track";
import {Album} from "../../albums/interfaces/album";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {SpinnerFunctions} from "../../core/static-functions";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService{
  private resultSubject = new BehaviorSubject<SearchResult>({ } as SearchResult)
  public result$ = this.resultSubject.asObservable();
  public artistsPagedResponse= signal<PagedResponse<Artist[]> | undefined>(undefined);
  public tracksPagedResponse = signal<PagedResponse<Track[]> | undefined>(undefined);
  public albumsPagedResponse = signal<PagedResponse<Album[]> | undefined>(undefined);
  public totalResults = signal<any>(undefined);
  public querySignal = signal('')
  public albumsPages = signal<number[]>([]);
  public tracksPages = signal<number[]>([]);
  public artistsPages = signal<number[]>([]);
  private _router = inject(Router)
  public track_page = signal<number>(1);
  public album_page = signal<number>(1);
  public artist_page = signal<number>(1);

  pageGroup: FormGroup = new FormGroup<any>({
    albums_page: new FormControl(1),
    tracks_page: new FormControl(1),
    artists_page: new FormControl(1)
  });

  search(query: string) {
    SpinnerFunctions.showSpinner();
    this.totalResults.set(undefined);
    this.track_page.set(1);
    this.artist_page.set(1);
    this.album_page.set(1);
    return this.get<ResponseAPI<SearchResult>>('search?query=' + query).subscribe({
      next: (response) => {
        if(response.data) {
          const searchResult = response.data;
          this.tracksPagedResponse.set(searchResult.tracks);
          this.artistsPagedResponse.set(searchResult.artists);
          this.albumsPagedResponse.set(searchResult.albums);
          this.totalResults.set(searchResult.tracks!.total + searchResult.artists!.total + searchResult.albums!.total);
          this.albumsPages.set(this.createArrayFrom(searchResult.albums?.last_page!));
          this.tracksPages.set(this.createArrayFrom(searchResult.tracks?.last_page!));
          this.artistsPages.set(this.createArrayFrom(searchResult.artists?.last_page!));
          console.log((this.albumsPages()))
        }
        SpinnerFunctions.hideSpinner();
      }
    })
  }

  createArrayFrom(to: number): number[] {
    return Array.from({ length: to}, (_, i) => i + 1);
  }
  changePagedResponsePage(nextPageUrl: string, typeOfPagedResponse: 'track' | 'album' | 'artist', isPreviousPage: boolean = false) {
    const type = typeOfPagedResponse;

    switch (typeOfPagedResponse) {
      case "track": isPreviousPage ? this.track_page.update(x => x-1) : this.track_page.update(x => x+1); break
      case "artist": isPreviousPage ? this.artist_page.update(x => x-1) : this.artist_page.update(x => x+1); break
      case "album": isPreviousPage ? this.album_page.update(x => x-1) : this.album_page.update(x => x+1); break
      default: return
    }
    let query: string = `search?query=${this.querySignal()}` + `&track_page=${this.track_page()}&album_page=${this.album_page()}&artist_page=${this.artist_page()}`

    return this.get<ResponseAPI<SearchResult>>(query).subscribe({
      next: (response: ResponseAPI<SearchResult>) => {
        switch (type) {
          case "track": {
            this.tracksPagedResponse.set(response.data.tracks);
            this.pageGroup.get('tracks_page')?.setValue(this.track_page())
          } break;
          case "artist": {
            this.artistsPagedResponse.set(response.data.artists);
            this.pageGroup.get('artists_page')?.setValue(this.artist_page())

          } break;
          case "album": {
            this.albumsPagedResponse.set(response.data.albums);
            this.pageGroup.get('albums_page')?.setValue(this.album_page())
          }
        }
      }
    })
  }

  goToPage(page: number, typeOfPagedResponse: 'track' | 'album' | 'artist') {
    let query: string = `search?query=${this.querySignal()}` + `&track_page=${this.track_page()}&album_page=${this.album_page()}&artist_page=${this.artist_page()}`

    return this.get<ResponseAPI<SearchResult>>(query).subscribe({
      next: (response: ResponseAPI<SearchResult>) => {
        switch (typeOfPagedResponse) {
          case "track": {
            this.tracksPagedResponse.set(response.data.tracks);
            this.pageGroup.get('tracks_page')?.setValue(this.track_page())
          } break;
          case "artist": {
            this.artistsPagedResponse.set(response.data.artists);
            this.pageGroup.get('artists_page')?.setValue(this.artist_page())

          } break;
          case "album": {
            this.albumsPagedResponse.set(response.data.albums);
            this.pageGroup.get('albums_page')?.setValue(this.album_page())
          }
        }
      }
    })
  }
}
