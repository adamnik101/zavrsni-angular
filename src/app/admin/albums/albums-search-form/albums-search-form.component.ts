import { Component } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {AdminAlbumService} from "../services/admin-album.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-albums-search-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './albums-search-form.component.html',
  styleUrl: './albums-search-form.component.scss'
})
export class AlbumsSearchFormComponent {

  constructor(private _adminAlbumService: AdminAlbumService) {
  }
  albumFormGroup = new FormGroup({
    name: new FormControl(''),
    master: new FormControl(''),
    tracksCountFrom: new FormControl(null),
    tracksCountTo: new FormControl(null),
    releaseYear: new FormControl(null),
    createdFrom: new FormControl(undefined),
    createdTo: new FormControl(undefined),
    updatedFrom: new FormControl(undefined),
    updatedTo: new FormControl(undefined),
  })

  currentYear = new Date().getFullYear()
  years: number[] = []
  ngOnInit() {
    this.years = this.createRangeForYears(101)
  }
  createRangeForYears (years: number) {
    return new Array(years).fill(this.currentYear)
      .map((n, index) => this.currentYear - index)
  }
  search() {
    let group = this.albumFormGroup
    let name = group.get('name')?.value?.trim()
    let master = group.get('master')?.value?.trim()
    let tracksCountFrom = group.get('tracksCountFrom')?.value
    let tracksCountTo = group.get('tracksCountTo')?.value
    let releaseYear = group.get('releaseYear')?.value
    let createdFrom = group.get('createdFrom')?.value
    let createdTo = group.get('createdTo')?.value
    let updatedFrom = group.get('updatedFrom')?.value
    let updatedTo = group.get('updatedTo')?.value

    this._adminAlbumService.params = new HttpParams()

    if(name) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('name', name)
    }
    if(master) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('master', master)
    }
    if(tracksCountFrom) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('tracksCountFrom', tracksCountFrom)
    }
    if(tracksCountTo) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('tracksCountTo', tracksCountTo)
    }
    if(releaseYear) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('releaseYear', releaseYear)
    }
    if(createdFrom) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('createdFrom', createdFrom)
    }
    if(createdTo) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('createdTo', createdTo)
    }
    if(updatedFrom) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('updatedFrom', updatedFrom)
    }
    if(updatedTo) {
      this._adminAlbumService.params = this._adminAlbumService.params.append('updatedTo', updatedTo)
    }
    console.log(this._adminAlbumService.params)
    this._adminAlbumService.getPagedResponse(this._adminAlbumService.params).subscribe({
      next: (pagedResponse) => {
        this._adminAlbumService.setPagedResponse(pagedResponse)
      }
    })
  }

  reset() {
    this.albumFormGroup.reset()
  }
}
