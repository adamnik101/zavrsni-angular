import {Artist} from "../../artists/interfaces/artist";
import {Track} from "../../shared/interfaces/track";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Settings} from "../../settings/interfaces/settings";

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  active: boolean
  following: Artist[]
  liked_tracks: Track[]
  playlists: Playlist[]
  following_count: number
  playlists_count: number
  settings: Settings
  formatted_created_at: string
  formatted_updated_at: string
}
