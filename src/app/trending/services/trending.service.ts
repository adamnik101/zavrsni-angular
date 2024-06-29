import { Injectable } from '@angular/core';
import {BaseService} from "../../core/services/base.service";
import {Track} from "../../shared/interfaces/track";
import {Album} from "../../albums/interfaces/album";
import {Artist} from "../../artists/interfaces/artist";
import { forkJoin, Observable } from 'rxjs';
import { TrackService } from 'src/app/tracks/services/track.service';
import { ArtistService } from 'src/app/artists/services/artist.service';
import { AlbumService } from 'src/app/albums/services/album.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class TrendingService extends BaseService{

 
}
