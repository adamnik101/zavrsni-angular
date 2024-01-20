import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpParams} from "@angular/common/http";
import {AdminTracksService} from "../services/admin-tracks.service";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-tracks-search-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './tracks-search-form.component.html',
  styleUrl: './tracks-search-form.component.scss'
})
export class TracksSearchFormComponent {
  constructor(private _adminTrackService: AdminTracksService) {
  }
  trackFormGroup = new FormGroup({
    title: new FormControl(''),
    owner: new FormControl(''),
    featuring: new FormControl(''),
    album: new FormControl(''),
    explicit: new FormControl(null),
    playsFrom: new FormControl(null),
    playsTo: new FormControl(null),
    createdFrom: new FormControl(undefined),
    createdTo: new FormControl(undefined),
    updatedFrom: new FormControl(undefined),
    updatedTo: new FormControl(undefined)
  });

  search() {
    let title = this.trackFormGroup.get('title')?.value?.trim()
    let owner = this.trackFormGroup.get('owner')?.value?.trim()
    let album = this.trackFormGroup.get('album')?.value?.trim()
    let explicit = this.trackFormGroup.get('explicit')?.value
    let featuring = this.trackFormGroup.get('featuring')?.value?.trim()
    let createdFrom = this.trackFormGroup.get('createdFrom')?.value
    let createdTo = this.trackFormGroup.get('createdTo')?.value
    let updatedFrom = this.trackFormGroup.get('updatedFrom')?.value
    let updatedTo = this.trackFormGroup.get('updatedTo')?.value
    let playsFrom = this.trackFormGroup.get('playsFrom')?.value
    let playsTo = this.trackFormGroup.get('playsTo')?.value

    this._adminTrackService.params = new HttpParams()

    if(title) {
      this._adminTrackService.params = this._adminTrackService.params.append('title', title)
    }
    if(owner) {
      this._adminTrackService.params = this._adminTrackService.params.append('owner', owner)
    }
    if(album) {
      this._adminTrackService.params = this._adminTrackService.params.append('album', album)
    }
    if(featuring) {
      this._adminTrackService.params = this._adminTrackService.params.append('featuring', featuring)
    }
    if(explicit !== null && explicit !== undefined) {
      this._adminTrackService.params = this._adminTrackService.params.append('explicit', explicit)
    }
    if(playsFrom !== null && playsFrom !== undefined) {
      this._adminTrackService.params = this._adminTrackService.params.append('playsFrom', playsFrom)
    }
    if(playsTo !== null && playsTo !== undefined) {
      this._adminTrackService.params = this._adminTrackService.params.append('playsTo', playsTo)
    }
    if(createdFrom) {
      this._adminTrackService.params = this._adminTrackService.params.append('createdFrom', createdFrom)
    }
    if(createdTo) {
      this._adminTrackService.params = this._adminTrackService.params.append('createdTo', createdTo)
    }
    if(updatedFrom) {
      this._adminTrackService.params = this._adminTrackService.params.append('updatedFrom', updatedFrom)
    }
    if(updatedTo) {
      this._adminTrackService.params = this._adminTrackService.params.append('updatedTo', updatedTo)
    }
    this._adminTrackService.getPagedResponse(this._adminTrackService.params).subscribe({
      next: (pagedResponse) => {
        this._adminTrackService.setPagedResponse(pagedResponse)
      }
    })
  }

  reset() {
    this.trackFormGroup.reset()
  }
}
