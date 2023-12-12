import {Component, Input} from '@angular/core';
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Album} from "../../../albums/interfaces/album";
import {AdminAlbumService} from "../services/admin-album.service";

@Component({
  selector: 'app-album-table',
  templateUrl: './album-table.component.html',
  styleUrls: ['./album-table.component.scss']
})
export class AlbumTableComponent {

  @Input('pagedResponse') pagedResponse: PagedResponse<Album[]> = {} as PagedResponse<Album[]>

  constructor(private _adminAlbumService: AdminAlbumService) {
  }

  navigateTo(url: string) {
    this._adminAlbumService.navigateTo(url).subscribe({
      next: (pagedResponse) => {
        this._adminAlbumService.setPagedResponse(pagedResponse)
      }
    })
  }

  openDeleteDialog(id: string, name: string, albums: string, current_page: number) {

  }

  openEditDialog(album: Album) {

  }
}
