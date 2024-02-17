import {Track} from "./track";

export interface AddTracksToPlaylistResponse {
  message: string
  status: 'warning-some' | 'warning-all'
  tracksAlreadyInPlaylist: string[]
  allTracksIds?: string[]
  added_count?: number
  actions: string[]
  content: string
  playlist_id: string
}
export interface ErrorTracksToPlaylistResponse {
  message: string
  status: 'warning-some' | 'warning-all'
  tracks_already_in_playlist: string[]
  all_tracks_id?: string[]
  added_count?: number
  actions: string[]
  content: string
  playlist_id: string
}
export interface SuccessTracksToPlaylistResponse {
  message: string
  added_count: number
  playlist_id: string
}
