import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {AdminArtistService} from "../../services/admin-artist.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-artist-search-form',
  standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
  templateUrl: './artist-search-form.component.html',
  styleUrl: './artist-search-form.component.scss'
})
export class ArtistSearchFormComponent {

  constructor(private _adminArtistService: AdminArtistService) {
  }
  artistFormGroup = new FormGroup({
    name: new FormControl(''),
    tracksCountFrom: new FormControl(),
    tracksCountTo: new FormControl(),
    createdFrom: new FormControl(undefined),
    createdTo: new FormControl(undefined),
    updatedFrom: new FormControl(undefined),
    updatedTo: new FormControl(undefined)
  })

  search() {
    let group = this.artistFormGroup
    let name = group.get('name')?.value
    let tracksFrom = group.get('tracksCountFrom')?.value
    let tracksTo = group.get('tracksCountTo')?.value
    let createdFrom = group.get('createdFrom')?.value
    let createdTo = group.get('createdTo')?.value
    let updatedFrom = group.get('updatedFrom')?.value
    let updatedTo = group.get('updatedTo')?.value

    this._adminArtistService.params = new HttpParams()
    let params = this._adminArtistService.params
    if(name) {
      params = params.append('name', name)
    }
    if(tracksFrom) {
      params = params.append('tracksCountFrom', tracksFrom)
    }
    if(tracksTo) {
      params = params.append('tracksCountTo', tracksTo)
    }
    if(createdFrom) {
      params = params.append('createdFrom', createdFrom)
    }
    if(createdTo) {
      params = params.append('createdTo', createdTo)
    }
    if(updatedFrom) {
      params = params.append('updatedFrom', updatedFrom)
    }
    if(updatedTo) {
      params = params.append('updatedTo', updatedTo)
    }
    this._adminArtistService.params = params
    this._adminArtistService.getPagedResponse(params).subscribe({
      next: (pagedResponse) => {
        this._adminArtistService.setPagedResponse(pagedResponse.data)
      }
    })
  }

  reset() {
    this.artistFormGroup.reset()
  }
}
