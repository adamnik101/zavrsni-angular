import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Playlist} from "../interfaces/playlist";
import {MatButtonModule} from "@angular/material/button";
import {PlaylistService} from "../services/playlist.service";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Component({
  selector: 'app-confirm-playlist-delete-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm-playlist-delete-dialog.component.html',
  styleUrl: './confirm-playlist-delete-dialog.component.scss'
})
export class ConfirmPlaylistDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Playlist,
              private _dialogRef: MatDialogRef<ConfirmPlaylistDeleteDialogComponent>,
              private _playlistService: PlaylistService,
              private _snackbar: SnackbarService) {
  }

  confirmDelete() {
    this._playlistService.deletePlaylist(this.data).subscribe({
      next: (response) => {
        let without = this._playlistService.playlists().filter(p => p.id !== this.data.id)
        this._playlistService.playlists.set(without)
        this._snackbar.showDefaultMessage(`Removed '${this.data.title}' from your library`)
        this._dialogRef.close()
      },
      error: (err) => {
        this._snackbar.showDefaultMessage(err.error.message)
      }
    })
  }
}
