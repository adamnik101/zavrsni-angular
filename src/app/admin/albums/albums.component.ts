import { Component } from '@angular/core';
import {AdminAlbumService} from "./services/admin-album.service";
import {LoaderService} from "../../core/services/loader.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  constructor(public adminAlbumService: AdminAlbumService,
              private _loader: LoaderService) {
  }
  ngOnInit() {
    this._loader.showLoader()
    this.adminAlbumService.getPagedResponse().subscribe({
      next: (pagedResponse) => {
        this.adminAlbumService.setPagedResponse(pagedResponse)
        this._loader.hideLoader()
      }
    })
  }
}
