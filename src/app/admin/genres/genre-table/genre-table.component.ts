import {Component, Input} from '@angular/core';
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Genre} from "../../../genre/interfaces/genre";
import {AdminGenreService} from "../services/admin-genre.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-genre-table',
  templateUrl: './genre-table.component.html',
  styleUrls: ['./genre-table.component.scss']
})
export class GenreTableComponent {
  @Input('pagedResponse') pagedResponse: PagedResponse<Genre[]> = {} as PagedResponse<Genre[]>

  constructor(private _adminGenreService: AdminGenreService,
              private _matDialog: MatDialog) {
  }
  navigateTo(url: string) {
    this._adminGenreService.navigateTo(url)
  }

  openDeleteDialog(id: string, name: string, path: string, current_page: number) {
    this._matDialog.open(DeleteDialogComponent, {
      data : {
        id: id,
        name: name,
        path: path,
        page: current_page
      }
    })
  }

  openEditDialog(genre: Genre) {

  }
}
