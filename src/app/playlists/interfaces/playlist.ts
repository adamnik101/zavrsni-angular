import {Track} from "../../shared/interfaces/track";
import {PagedResponse} from "../../shared/interfaces/paged-response";

export interface Playlist {
  id: string
  title: string,
  description: string
  tracks_count: number
  created_at: string
  image_url: string
  tracks: Track[]
  latest_added: string
}
