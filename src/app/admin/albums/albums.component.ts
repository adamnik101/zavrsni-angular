import { Component } from '@angular/core';
import {AdminAlbumService} from "./services/admin-album.service";
import { SpinnerFunctions } from 'src/app/core/static-functions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  constructor(
    public adminAlbumService: AdminAlbumService
  ) { }

  ngOnInit() {
    SpinnerFunctions.showSpinner();
    this.adminAlbumService.getPagedResponse().subscribe({
      next: (pagedResponse) => {
        this.adminAlbumService.setPagedResponse(pagedResponse.data)
        SpinnerFunctions.hideSpinner();
      }
    })
  }
}
