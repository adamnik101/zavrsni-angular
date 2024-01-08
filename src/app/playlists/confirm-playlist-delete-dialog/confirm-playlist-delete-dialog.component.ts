import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Playlist} from "../interfaces/playlist";
import {MatButtonModule} from "@angular/material/button";
import {PlaylistService} from "../services/playlist.service";

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
              private _playlistService: PlaylistService) {
  }

  confirmDelete() {
    this._playlistService.deletePlaylist(this.data).add(() => {
      this._dialogRef.close()
    })
  }
}
