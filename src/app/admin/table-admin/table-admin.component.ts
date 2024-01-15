import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SelectionService} from "../services/selection.service";
import {PagedResponse} from "../../shared/interfaces/paged-response";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {NameColumnPipe} from "../pipes/name-column.pipe";
import {HumanizeBooleanPipe} from "../pipes/humanize-boolean.pipe";
import {DatePipe, DecimalPipe, NgClass} from "@angular/common";
import {AdminTracksService} from "../tracks/services/admin-tracks.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteMultipleEntitiesDialog} from "../delete-multiple-entities-dialog/delete-multiple-entities-dialog.component";
import {AddTrackDialogComponent} from "../tracks/add-track-dialog/add-track-dialog.component";
import {AdminUserService} from "../users/services/admin-user.service";

@Component({
  selector: 'app-table-admin',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    NameColumnPipe,
    HumanizeBooleanPipe,
    DatePipe,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './table-admin.component.html',
  styleUrl: './table-admin.component.scss'
})
export class TableAdminComponent<T extends  {}> {
  @Input() title: string = ''
  @Input() data: PagedResponse<any[]> | null = null
  @Input() columns: string[] = []

  @ViewChild('selectAll') selectAllCheckbox!: ElementRef
  constructor(protected _selectionService: SelectionService,
              private _adminTrackService: AdminTracksService,
              private _adminUserService: AdminUserService,
              private _renderer2: Renderer2,
              private _dialog: MatDialog) { }
  openAddDialog() {
    switch (this.title.toLowerCase()) {
      case 'tracks' : {
        this._dialog.open(AddTrackDialogComponent)
      } break
      case 'genres' : {
      }
    }
  }

  unselectAll() {
    this._selectionService.removeAll(this.selectAllCheckbox)
  }

  deleteSelected() {
    this._dialog.open(DeleteMultipleEntitiesDialog, {
      data: this.title.toLowerCase()
    })
  }

  onSelectAll(event: MatCheckboxChange) {
    this._selectionService.onAllSelectChange(event, this.data!.data)
  }

  navigateTo(url: string) {
    switch (this.title.toLowerCase()) {
      case 'tracks' : {
        return this._adminTrackService.navigateTo(url).subscribe({
          next: (pagedResponse) => {
            this._adminTrackService.setPagedResponse(pagedResponse)
            this.checkIfAllAreSelected(pagedResponse.data)
          }
        })
      } break
      case 'users': {
        return this._adminUserService.navigateTo(url).subscribe({
          next: (pagedResponse) => {
            this._adminUserService.setPagedResponse(pagedResponse)
            this.checkIfAllAreSelected(pagedResponse.data)
          }
        })
      }
      default : {
        return
      }
    }
  }

  private checkIfAllAreSelected(data: any[]) {
    let countOfCurrentPageSelection = 0
    for(let item of data) {
      if(this._selectionService.selectedItems().includes(item.id)) {
        countOfCurrentPageSelection++
      }
    }
    if(countOfCurrentPageSelection === 10) {
      this._renderer2.setProperty(this.selectAllCheckbox, 'checked', true)
    } else{
      this._renderer2.setProperty(this.selectAllCheckbox, 'checked', false)
    }
  }

  onSelectChange(event: MatCheckboxChange, item: any) {
    this._selectionService.onSingleSelectChange(event, item.id, this.selectAllCheckbox)
  }
}
