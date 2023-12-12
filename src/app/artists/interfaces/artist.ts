import {Track} from "../../shared/interfaces/track";
import {Album} from "../../albums/interfaces/album";

export interface Artist {
  id: string
  name: string
  cover: string
  own_tracks: Track[]
  own_tracks_count: number
  feature_tracks: Track[]
  albums_count: number
  albums: Album[]
  featured_albums: Album[]
  followed_by_count: number
  created_at: string
  updated_at: string
  deleted_at: string
}
