import {Component, ElementRef, Input, Renderer2, signal, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Track} from "../../../shared/interfaces/track";
import {AdminTracksService} from "../services/admin-tracks.service";
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {AddTrackDialogComponent} from "../add-track-dialog/add-track-dialog.component";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {SelectionService} from "../../services/selection.service";
import {DeleteDialogComponent} from "../../delete-dialog/delete-dialog.component";
import {DeleteDialogGenericComponent} from "../../delete-dialog-generic/delete-dialog-generic.component";
import {MatDialog} from "@angular/material/dialog";
import {AdminOperationsService} from "../../services/admin-operations.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-tracks-table',
  templateUrl: './tracks-table.component.html',
  styleUrls: ['./tracks-table.component.scss']
})
export class TracksTableComponent {
  @Input('pagedResponse') pagedResponse: PagedResponse<Track[]> = {} as PagedResponse<Track[]>
  @ViewChild('selectAll') selectAllCheckbox!: ElementRef
  selected = signal<string[]>([])

  constructor(private _adminTrackService: AdminTracksService,
              private _adminOperations: AdminOperationsService,
              private _dialog: MatDialog,
              private renderer2: Renderer2,
              protected _selectionService: SelectionService,
              private _snackbar: SnackbarService) {
  }
  deleteSelectedTracks(){
    let dialogRef = this._dialog.open(DeleteDialogGenericComponent)
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if(response === true) {
          this._adminOperations.deleteItems(this._selectionService.selectedItems(), 'tracks').subscribe({
            next: (response) => {
              this._snackbar.showSuccessMessage('Deleted')
            }
          })
          console.log('To Delete: ',this._selectionService.selectedItems())
        }
        else if(response === false) {
          console.log('To Delete: Nothing..')
        }
        else {
          console.log('undefined response')
        }
      }
    })
    console.log(this._selectionService.selectedItems())
  }
  navigateTo(url: string) {
    return this._adminTrackService.navigateTo(url).subscribe({
      next: (pagedResponse) => {
        this._adminTrackService.setPagedResponse(pagedResponse)
        this.checkIfAllAreSelected(pagedResponse.data)
      }
    })
  }

  openEditDialog(track: Track) {

  }

  openDeleteDialog(id: string, title: string, tracks: string, current_page: number) {

  }

  openAddTrackDialog() {
    this._dialog.open(AddTrackDialogComponent)
  }

  onSelectChange(event: MatCheckboxChange, track: Track) {
    this._selectionService.onSingleSelectChange(event, track.id, this.selectAllCheckbox)
    // if(event.checked) {
    //   this.selected.update(ids => {
    //     ids.push(track.id)
    //     return ids
    //   })
    //   return
    // }
    // this.selected.update(ids => {
    //   for(let i = 0; i < ids.length; i++) {
    //     if(ids[i] === track.id) {
    //       this.renderer2.setProperty(this.selectAllCheckbox, 'checked', false)
    //       ids.splice(i, 1)
    //     }
    //   }
    //   return ids
    // })
  }

  onSelectAll(event: MatCheckboxChange) {
    this._selectionService.onAllSelectChange(event, this.pagedResponse.data)
    // if(event.checked) {
    //   for(let track of this.pagedResponse.data) {
    //     this.pushToSelected(track.id)
    //   }
    //   return
    // }
    // this.selected.set([])
  }
  pushToSelected(id: string) {
      this.selected.update(ids => {
        ids.push(id)
        return ids
      })
  }

  unselectAll() {
    this._selectionService.removeAll(this.selectAllCheckbox)
  }

  private checkIfAllAreSelected(data: any[]) {
    let countOfCurrentPageSelection = 0
    for(let item of data) {
      if(this._selectionService.selectedItems().includes(item.id)) {
        countOfCurrentPageSelection++
      }
    }
    if(countOfCurrentPageSelection === 10) {
      this.renderer2.setProperty(this.selectAllCheckbox, 'checked', true)
    } else{
      this.renderer2.setProperty(this.selectAllCheckbox, 'checked', false)
    }
  }
}
