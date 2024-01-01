import {Track} from "./track";

export interface AddTracksToPlaylistResponse {
  message: string
  status: 'warning-some' | 'warning-all'
  tracksAlreadyInPlaylist: string[]
  allTracksIds?: string[]
  addedCount?: number
  actions: string[]
  content: string
  playlistId: string
}
