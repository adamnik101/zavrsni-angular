import {Artist} from "../../artists/interfaces/artist";
import {Track} from "../../shared/interfaces/track";
import {Playlist} from "../../playlists/interfaces/playlist";
import {Settings} from "../../settings/interfaces/settings";
import {Album} from "../../albums/interfaces/album";
import {Role} from "./role";

export interface User {
  id: string
  username: string
  email: string
  active: boolean
  role: Role
  followings: Artist[]
  liked_tracks: Track[]
  liked_albums: Album[]
  playlists: Playlist[]
  following_count: number
  playlists_count: number
  settings: Settings
  cover: string
  formatted_created_at: string
  formatted_updated_at: string
}
