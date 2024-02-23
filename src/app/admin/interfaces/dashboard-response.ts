export interface DashboardResponse {
  album_count: number
  user_count: number
  playlist_count: number
  track_count: number
  artist_count: number
  average_count_per_user : {
    playlists: number,
    likes: number,
    followings: number
  }
}
