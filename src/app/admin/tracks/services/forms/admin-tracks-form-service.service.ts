import {inject, Injectable} from '@angular/core';
import {BaseService} from "../../../../core/services/base.service";
import {ArtistService} from "../../../../artists/services/artist.service";
import {GenreService} from "../../../../genre/services/genre.service";
import {forkJoin, Observable} from "rxjs";
import {Artist} from "../../../../artists/interfaces/artist";
import {Genre} from "../../../../genre/interfaces/genre";
import {ResponseAPI} from "../../../../shared/interfaces/response-api";

@Injectable({
  providedIn: 'root'
})
export class AdminTracksFormServiceService extends BaseService{

  private artistService = inject(ArtistService);
  private genreService = inject(GenreService);

  public getAllDataFromRequests(): Observable<any> {
    return forkJoin({
      artists: this.getArtists(),
      genres: this.getGenres()
    });
  }

  private getArtists(): Observable<ResponseAPI<Artist[]>> {
    return this.artistService.getArtists();
  }

  private getGenres(): Observable<ResponseAPI<Genre[]>> {
    return this.genreService.getGenres();
  }
}
