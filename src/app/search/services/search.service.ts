import {inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BaseService} from "../../core/services/base.service";
import {HttpHeaders} from "@angular/common/http";
import {SearchResult} from "../interfaces/search-result";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService{
  private resultSubject = new BehaviorSubject<SearchResult>({ } as SearchResult)
  public result$ = this.resultSubject.asObservable()
  public querySignal = signal('')
  private _router = inject(Router)
  search(query: string) {
    this.track_page = 1
    this.artist_page = 1
    this.album_page = 1
    return this.get<SearchResult>('search?search=' + query).subscribe({
      next: (response) => {
        this.resultSubject.next(response)
      }
    })
  }
  private track_page = 1
  private album_page = 1
  private artist_page = 1
  changePagedResponsePage(nextPageUrl: string, typeOfPagedResponse: 'track' | 'album' | 'artist') {
    switch (typeOfPagedResponse) {
      case "track": this.track_page++; break
      case "artist": this.artist_page++; break
      case "album": this.album_page++; break
      default: return
    }
    let query = `search?search=${this.querySignal()}` + `&track_page=${this.track_page}&album_page=${this.album_page}&artist_page=${this.artist_page}`
    console.log(query)
    return this.get<SearchResult>(query).subscribe({
      next: (response) => {
        this.resultSubject.next(response)
      }
    })
  }
  goToPreviousPagedResponse(typeOfPagedResponse: 'track' | 'album' | 'artist') {
    switch (typeOfPagedResponse) {
      case "track": this.track_page--; break
      case "artist": this.artist_page--; break
      case "album": this.album_page--; break
      default: return
    }
    let query = `search?search=${this.querySignal()}` + `&track_page=${this.track_page}&album_page=${this.album_page}&artist_page=${this.artist_page}`
    console.log(query)
    return this.get<SearchResult>(query).subscribe({
      next: (response) => {
        this.resultSubject.next(response)
      }
    })
  }
}
