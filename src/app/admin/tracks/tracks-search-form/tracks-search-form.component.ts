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
    MatRadioModule
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
    let playsFrom = this.trackFormGroup.get('playsFrom')?.value
    let playsTo = this.trackFormGroup.get('playsTo')?.value

    let params = new HttpParams()

    if(title) {
      params = params.append('title', title)
    }
    if(owner) {
      params = params.append('owner', owner)
    }
    if(album) {
      params = params.append('album', album)
    }
    if(featuring) {
      params = params.append('featuring', featuring)
    }
    if(explicit !== null && explicit !== undefined) {
      params = params.append('explicit', explicit)
    }
    if(playsFrom) {
      params = params.append('playsFrom', playsFrom)
    }
    if(playsTo) {
      params = params.append('playsTo', playsTo)
    }
    if(createdFrom) {
      params = params.append('createdFrom', createdFrom)
    }
    this._adminTrackService.getPagedResponse(params).subscribe({
      next: (pagedResponse) => {
        this._adminTrackService.setPagedResponse(pagedResponse)
      }
    })
  }

  reset() {
    this.trackFormGroup.reset()
  }
}
