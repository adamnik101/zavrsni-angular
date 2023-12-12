import {Playlist} from "../../playlists/interfaces/playlist";

export interface Genre {
  id: string
  name: string
  cover: string
  hex_color: string,
  playlists: Playlist[]
  formatted_created_at: string
  formatted_updated_at: string
}
