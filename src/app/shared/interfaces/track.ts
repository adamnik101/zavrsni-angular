import {Artist} from "../../artists/interfaces/artist";
import {Album} from "../../albums/interfaces/album";

export interface Track {
  album_id?: string;
  id: string
  title: string
  cover: string
  duration: number
  path: string
  explicit: boolean
  track_plays_count: number
  owner: Artist
  features: Artist[]
  album?: Album
  pivot?: {
    id: string
    track_id: string
    playlist_id: string
    created_at: string
    updated_at: string
  }
  count: number
  formatted_created_at: string
  formatted_updated_at: string
  genre_id: string
  liked_by_count?: number;
}
