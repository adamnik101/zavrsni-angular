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
import {AdminUserService} from "../users/services/admin-user.service";
import {AdminArtistService} from "../services/admin-artist.service";
import {AdminAlbumService} from "../albums/services/admin-album.service";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {AdminService} from "../services/admin.service";
import {HttpParams} from "@angular/common/http";
import {AdminGenreService} from "../genres/services/admin-genre.service";
import {TracksSearchFormComponent} from "../tracks/tracks-search-form/tracks-search-form.component";
import {AlbumsSearchFormComponent} from "../albums/albums-search-form/albums-search-form.component";
import {GenreSearchFormComponent} from "../genres/genre-search-form/genre-search-form.component";
import {UserSearchFormComponent} from "../users/user-search-form/user-search-form.component";
import {ArtistSearchFormComponent} from "../artists/artist-search-form/artist-search-form.component";
import {ArtistFormDialogComponent} from "../artists/artist-form-dialog/artist-form-dialog.component";
import {TracksFormDialogComponent} from "../tracks/tracks-form-dialog/tracks-form-dialog.component";
import {ResponseAPI} from "../../shared/interfaces/response-api";
import {AlbumsFormDialogComponent} from "../albums/albums-form-dialog/albums-form-dialog.component";
import {UsersFormDialogComponent} from "../users/users-form-dialog/users-form-dialog.component";
import {GenresFormDialogComponent} from "../genres/genres-form-dialog/genres-form-dialog.component";

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
    DecimalPipe,
    MatInputModule,
    MatMenuModule,
    TracksSearchFormComponent,
    AlbumsSearchFormComponent,
    GenreSearchFormComponent,
    UserSearchFormComponent,
    ArtistSearchFormComponent
  ],
  templateUrl: './table-admin.component.html',
  styleUrl: './table-admin.component.scss'
})
export class TableAdminComponent<T extends  {}> {
  @Input() title: string = ''
  @Input() data: PagedResponse<any[]> | null = null
  @Input() columns: string[] = []
  service : any
  @ViewChild('selectAll') selectAllCheckbox!: ElementRef
  constructor(protected _selectionService: SelectionService,
              private _adminService: AdminService,
              private _adminTrackService: AdminTracksService,
              private _adminUserService: AdminUserService,
              private _adminArtistService: AdminArtistService,
              private _adminAlbumService: AdminAlbumService,
              private _adminGenreService: AdminGenreService,
              private _renderer2: Renderer2,
              private _dialog: MatDialog) { }
  ngOnInit() {
    this.service = this.serviceForCurrentPage()
  }

  openAddDialog() {
    let config = {
      data: {
        isEdit: false
      }
    }
    
    switch (this.title.toLowerCase()) {
      case 'tracks' : {
        this._dialog.open(TracksFormDialogComponent, config).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break
      case 'genres' : {
        this._dialog.open(GenresFormDialogComponent, config).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break
      case 'artists' : {
        this._dialog.open(ArtistFormDialogComponent, config).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break
      case 'albums' : {
        this._dialog.open(AlbumsFormDialogComponent, config).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break
      case 'users' : {
        this._dialog.open(UsersFormDialogComponent, config).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break
    }
  }

  getDataAfterSuccessResponse(): void {
    console.log('get data')
    this.service.getPagedResponse().subscribe({
      next: (pagedResponse: ResponseAPI<PagedResponse<any>>): void => {
        if(pagedResponse) {
          this.service.setPagedResponse(pagedResponse.data);
        }
      }
    })
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

    if(this.service) {
      this.service.navigateTo(url).subscribe({
        next: (pagedResponse: ResponseAPI<PagedResponse<any>>) => {
          this.service.setPagedResponse(pagedResponse.data)
          this.checkIfAllAreSelected(pagedResponse.data.data)
        }
      })
    }
  }
  serviceForCurrentPage() {
    let service: any
    switch (this.title.toLowerCase()) {
      case 'tracks' : {
        service = this._adminTrackService
      } break;
      case 'users': {
        service = this._adminUserService
      } break;
      case 'artists' : {
        service = this._adminArtistService
      } break;
      case 'albums' : {
        service = this._adminAlbumService
      } break;
      case 'genres' : {
        service = this._adminGenreService
      } break;
      default : {
        service = null
      }
    }
    return service
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

  search(searchValue: string) {
    searchValue = searchValue.trim()
    let options = null
    let page = this.title.toLowerCase()
    if(page === 'albums') {
      //options.set('release_year', 1900)
      options = new HttpParams().appendAll({search: searchValue, release_year: 1900})
    }
    else if(page === 'tracks'){
      options = new HttpParams().appendAll({search: searchValue})
    }
    else if(page === 'users') {
      options = new HttpParams().appendAll({search: searchValue})
    }

    if(this.service && options) {
      this.service.getPagedResponse(options).subscribe({
        next: (pagedResponse: PagedResponse<any>) => {
          this.service.setPagedResponse(pagedResponse)
        }
      })
    }
  }

  deleteItem(item: any) {
    this._dialog.open(DeleteDialogComponent,{
      data : {
        id: item.id,
        name: item.name ? item.name : item.title,
        path: this.title.toLowerCase(),
        page: this.data?.current_page
      }
    })
  }

  openEditDialog(item: any) {
    switch (this.title.toLowerCase()) {
      case 'tracks' : {
        //this._dialog.open()
        this._dialog.open(TracksFormDialogComponent, {
          data: {
            isEdit: true,
            item: item
          }
        }).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break;
      case 'users': {
        this._dialog.open(UsersFormDialogComponent, {
          data: {
            isEdit: true,
            item: item
          }
        }).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break;
      case 'artists' : {
        this._dialog.open(ArtistFormDialogComponent, {
          data: {
            isEdit: true,
            item: item
          }
        }).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break;
      case 'albums' : {
        this._dialog.open(AlbumsFormDialogComponent, {
          data: {
            isEdit: true,
            item: item
          }
        }).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break;
      case 'genres' : {
        this._dialog.open(GenresFormDialogComponent, {
          data: {
            isEdit: true,
            item: item
          }
        }).afterClosed().subscribe({
          next: (data) => {
            if(data) {
              this.getDataAfterSuccessResponse();
            }
          }
        })
      } break;
      default : {

      }
    }
  }
}
