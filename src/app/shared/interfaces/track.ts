import {Artist} from "../../artists/interfaces/artist";
import {Album} from "../../albums/interfaces/album";

export interface Track {
  id: string
  title: string
  duration: number
  plays: number
  path: string
  explicit: boolean
  track_plays_count: number
  owner: Artist
  features: Artist[]
  album?: Album
  pivot?: {
    created_at: string
  }
  count: number
  formatted_created_at: string
  formatted_updated_at: string
}
