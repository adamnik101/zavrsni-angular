import {Component, ElementRef, Input, Renderer2, signal, ViewChild} from '@angular/core';
import {PagedResponse} from "../../../shared/interfaces/paged-response";
import {Track} from "../../../shared/interfaces/track";
import {AdminTracksService} from "../services/admin-tracks.service";
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {AddTrackDialogComponent} from "../add-track-dialog/add-track-dialog.component";
import {FormControl, FormGroup} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {SelectionService} from "../../services/selection.service";

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
              private _dialog: Dialog,
              private renderer2: Renderer2,
              protected _selectionService: SelectionService) {
  }
  deleteSelectedTracks(){
    console.log(this._selectionService.selectedItems())
  }
  navigateTo(url: string) {
    return this._adminTrackService.navigateTo(url).subscribe({
      next: (pagedResponse) => {
        this._adminTrackService.setPagedResponse(pagedResponse)
        this.renderer2.setProperty(this.selectAllCheckbox, 'checked', false)
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
    this._selectionService.removeAll()
  }
}
