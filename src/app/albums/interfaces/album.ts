import {Artist} from "../../artists/interfaces/artist";
import {Track} from "../../shared/interfaces/track";

export interface Album {
  id: string
  name: string
  cover: string
  release_year: number
  tracks_count: number
  artist: Artist
  tracks: Track[]
  created_at: string
  updated_at: string
}
