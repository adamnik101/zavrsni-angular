import {Album} from "../../albums/interfaces/album";
import {Track} from "../../shared/interfaces/track";
import {Artist} from "../../artists/interfaces/artist";
import {PagedResponse} from "../../shared/interfaces/paged-response";

export interface SearchResult {
  albums?: PagedResponse<Album[]>
  tracks?: PagedResponse<Track[]>
  artists?: PagedResponse<Artist[]>
}
