import {Component, Inject} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AdminService} from "../services/admin.service";
import {AdminArtistService} from "../services/admin-artist.service";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data : {id: string, name: string, path: string, page: number},
              private _dialogRef: DialogRef<DeleteDialogComponent>,
              private _adminService: AdminService,
              private _adminArtistService: AdminArtistService) {
  }

  delete() {
    this._adminService.deleteResource(this.data.id,this.data.path).subscribe({
      next: (response) => {
        console.log(response)
        this._dialogRef.close()
        this._adminArtistService.getPagedResponse().subscribe({
          next: (pagedResponse) => {
            this._adminArtistService.setPagedResponse(pagedResponse.data)
          }
        })
      }
    })
  }
}
