import { Component } from '@angular/core';
import {AdminAlbumService} from "./services/admin-album.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  constructor(public adminAlbumService: AdminAlbumService) {
  }
  ngOnInit() {
    this.adminAlbumService.getAlbums().subscribe({
      next: (pagedResponse) => {
        this.adminAlbumService.setPagedResponse(pagedResponse)
      }
    })
  }
}
