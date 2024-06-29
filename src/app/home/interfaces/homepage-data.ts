import { Album } from "src/app/albums/interfaces/album";
import { ResponseAPI } from "src/app/shared/interfaces/response-api";
import { Track } from "src/app/shared/interfaces/track";

export interface HomepageData {
    albums: ResponseAPI<Album[]>;
    tracks: ResponseAPI<Track[]>;
    recent?: ResponseAPI<Track[]>;
}
