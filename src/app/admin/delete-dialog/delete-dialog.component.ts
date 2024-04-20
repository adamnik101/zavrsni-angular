import {Component, Inject} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AdminService} from "../services/admin.service";
import {AdminArtistService} from "../services/admin-artist.service";
import {AdminTracksService} from "../tracks/services/admin-tracks.service";
import {AdminAlbumService} from "../albums/services/admin-album.service";
import {AdminGenreService} from "../genres/services/admin-genre.service";
import {AdminUserService} from "../users/services/admin-user.service";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data : {id: string, name: string, path: string, page: number},
              private _dialogRef: DialogRef<DeleteDialogComponent>,
              private _adminService: AdminService,
              private _adminArtistService: AdminArtistService,
              private _adminTrackService: AdminTracksService,
              private _adminAlbumService: AdminAlbumService,
              private _adminGenreService: AdminGenreService,
              private _adminUserService: AdminUserService) {
  }

  delete() {
    this._adminService.deleteResource(this.data.id,this.data.path).subscribe({
      next: (response) => {
        console.log(response)
        this._dialogRef.close()
        switch (this.data.path) {
          case "tracks" : {
            this._adminTrackService.getPagedResponse(this._adminTrackService.params).subscribe({
              next: (response) => {
                this._adminTrackService.setPagedResponse(response.data)
              }
            })
          } break
          case "artists" : {
            this._adminArtistService.getPagedResponse(this._adminArtistService.params).subscribe({
              next: (response) => {
                this._adminArtistService.setPagedResponse(response.data)
              }
            })
          } break
          case "albums" : {
            this._adminTrackService.getPagedResponse(this._adminTrackService.params).subscribe({
              next: (response) => {
                this._adminTrackService.setPagedResponse(response.data)
              }
            })
          } break
          case "genres" : {
            this._adminGenreService.getPagedResponse(this._adminGenreService.params).subscribe({
              next: (response) => {
                this._adminGenreService.setPagedResponse(response.data)
              }
            })
          } break
          case "users" : {
            this._adminUserService.getPagedResponse(this._adminUserService.params).subscribe({
              next: (response) => {
                this._adminUserService.setPagedResponse(response.data)
              }
            })
          } break
          default : {
            console.log('default')
          }
        }
        if(this.data.path === 'tracks'){

        }
        // this._adminArtistService.getPagedResponse().subscribe({
        //   next: (pagedResponse) => {
        //     this._adminArtistService.setPagedResponse(pagedResponse.data)
        //   }
        // })
      }
    })
  }
}
