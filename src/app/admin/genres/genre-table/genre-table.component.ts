import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Genre} from "../../../genre/interfaces/genre";
import {AdminGenreService} from "../services/admin-genre.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {SelectionService} from "../../services/selection.service";
import {DeleteMultipleEntitiesDialog} from "../../delete-multiple-entities-dialog/delete-multiple-entities-dialog.component";

@Component({
  selector: 'app-genre-table',
  templateUrl: './genre-table.component.html',
  styleUrls: ['./genre-table.component.scss']
})
export class GenreTableComponent {
  @Input('pagedResponse') pagedResponse: PagedResponse<Genre[]> = {} as PagedResponse<Genre[]>
  @ViewChild('selectAll') selectAllCheckbox!: ElementRef

  constructor(private _adminGenreService: AdminGenreService,
              private _matDialog: MatDialog,
              protected _selectionService: SelectionService) {
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

  onSelectAll(event: MatCheckboxChange) {
    this._selectionService.onAllSelectChange(event, this.pagedResponse.data)
  }

  onSelectChange(event: MatCheckboxChange, genre: Genre) {
    this._selectionService.onSingleSelectChange(event, genre.id, this.selectAllCheckbox)
  }

  openAddDialog() {

  }

  unselectAll() {
    this._selectionService.removeAll(this.selectAllCheckbox)
  }

  deleteSelected() {
    this._matDialog.open(DeleteMultipleEntitiesDialog)
    console.log(this._selectionService.selectedItems())
  }
}
