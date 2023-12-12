import {Component, Input} from '@angular/core';
import {Artist} from "../../../artists/interfaces/artist";
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {MatDialog} from "@angular/material/dialog";
import {CreateArtistDialogComponent} from "../create-artist-dialog/create-artist-dialog.component";
import {AdminArtistService} from "../../services/admin-artist.service";
import {EditArtistDialogComponent} from "../edit-artist-dialog/edit-artist-dialog.component";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-artists-table',
  templateUrl: './artists-table.component.html',
  styleUrls: ['./artists-table.component.scss']
})
export class ArtistsTableComponent {
  @Input('artists') artists : Artist[] = []
  @Input('pagedResponse') pagedResponse: PagedResponse<Artist[]> = {} as PagedResponse<Artist[]>;

  constructor(private _matDialog: MatDialog, private _adminArtistService: AdminArtistService) {
  }
  openCreateArtistDialog() {
    this._matDialog.open(CreateArtistDialogComponent)
  }

  navigateToNextPage() {
    this._adminArtistService.navigateToNextPage().subscribe({
      next: (pagedResponse) => {
        this._adminArtistService.setPagedResponse(pagedResponse)
      }
    })
  }

  navigateToPreviousPage() {
    this._adminArtistService.navigateToPreviousPage().subscribe({
      next: (pagedResponse) => {
        this._adminArtistService.setPagedResponse(pagedResponse)
      }
    })
  }

  openEditDialog(artist: Artist) {
    this._matDialog.open(EditArtistDialogComponent, {
      data: artist
    })
  }

  openDeleteDialog(id: string, name: string, path: string, page: number) {
    this._matDialog.open(DeleteDialogComponent, {
      data: {
        id: id,
        name: name,
        path: path,
        page: page
      }
    })
  }

  navigateTo(url: string) {
    this._adminArtistService.navigateTo(url).subscribe({
      next: (pagedResponse) => {
        this._adminArtistService.setPagedResponse(pagedResponse)
      }
    })
  }
}
