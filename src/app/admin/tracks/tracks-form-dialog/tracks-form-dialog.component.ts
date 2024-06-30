import {Component, ElementRef, Inject, OnInit, Signal, signal, ViewChild} from '@angular/core';
import {FormComponent} from "../../interfaces/form-component";
import {Track} from "../../../shared/interfaces/track";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {DialogData} from "../../interfaces/dialog-data";
import {IsSelectedInFeaturesPipe} from "../../pipes/is-selected-in-features.pipe";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Artist} from "../../../artists/interfaces/artist";
import {ArtistService} from "../../../artists/services/artist.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Genre} from "../../../genre/interfaces/genre";
import {GenreService} from "../../../genre/services/genre.service";
import {AdminTracksService} from "../services/admin-tracks.service";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import {DialogLoadingComponent} from "../../dialog-loading/dialog-loading.component";
import {AdminService} from "../../services/admin.service";
import {AdminTracksFormServiceService} from "../services/forms/admin-tracks-form-service.service";

@Component({
  selector: 'app-tracks-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IsSelectedInFeaturesPipe,
    MatOptionModule,
    MatSelectModule,
    AsyncPipe,
    DialogLoadingComponent,
  ],
  templateUrl: './tracks-form-dialog.component.html',
  styleUrl: './tracks-form-dialog.component.scss'
})
export class TracksFormDialogComponent implements FormComponent<Track>, OnInit {
  group: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    track: new FormControl(null, [Validators.required]),
    cover: new FormControl(null, [Validators.required]),
    owner : new FormControl(null, [Validators.required]),
    features : new FormControl([]),
    explicit: new FormControl(null, [Validators.required]),
    album : new FormControl({value: null, disabled: true}),
    genre: new FormControl(null, [Validators.required])
  })
  private artistsSubject = new BehaviorSubject<Artist[]>([])
  artists$ = this.artistsSubject.asObservable()
  artists : Artist[] = []
  genres : Genre[] = []
  subscriptions: Subscription[] = []
  owner = signal<Artist | undefined>(undefined)
  imageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  maxImageSize = 2000000 //2MB
  selectedImageSrc = ''
  maxTrackSize = 10000000 // 3.5MB
  trackTypes = ['audio/mpeg'];
  selectedTrack = null
  @ViewChild('trackFile') trackFile!: ElementRef
  trackInfo: string = ''
  dataLoading = true
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<Track>,
              private _artistService: ArtistService,
              private _genreService: GenreService,
              private _adminTrackService: AdminTracksService,
              private adminService: AdminService,
              private _snackbar: SnackbarService,
              private adminTracksFormServiceService: AdminTracksFormServiceService,
              private dialogRef: MatDialogRef<TracksFormDialogComponent>){
  }

  ngOnInit() {
    this.subscriptions.push(
      this.adminTracksFormServiceService.getAllDataFromRequests().subscribe({
        next: (data) => {
          this.artists = data.artists.data;
          this.genres = data.genres.data;

          if(this.data.isEdit) {
            this.fillForm(this.data.item);
          }
          this.dataLoading = false
        }
      })
    );

      this.trackOwnerValueChange();

    }

  trackOwnerValueChange(): void {
    this.group.get('owner')?.valueChanges.subscribe({
      next: (data: Artist) => {
        if(data) {
          if(data.albums.length) {
            this.group.get('album')?.enable();
            this.owner.update(value => {
              if (value) value.albums = data.albums;
              return value;
            });
          } else {
            this.group.get('album')?.disable();
            this.group.get('album')?.setValue(null)
          }
        }
      }
    })
  }

  fillForm(item: Track): void {
      this.trackInfo = item.path
      if(this.selectedTrack) {
        this.group.get('track')?.setValue(item.path)
      } else {
        this.group.get('track')?.clearValidators();
        this.group.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }
      this.group.get('title')?.setValue(item.title)
      this.group.get('owner')?.setValue(item.owner)
      this.group.get('explicit')?.setValue(item.explicit)
      if(this.selectedImageSrc) {
        this.group.get('cover')?.setValue(item.cover)
      } else {
        this.group.get('cover')?.clearValidators();
        this.group.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }
      this.group.get('genre')?.setValue(item.genre_id)
      if(this.group.get('owner')?.value) {
        if(item.album_id) {
          this.group.get('album')?.enable()
          this.group.get('album')?.setValue(item.album_id)
          console.log(this.group.get('album'))
        }
      }
      this.group.get('features')?.setValue([])
      if(item.features.length > 0) {
        let featureIds = []
        for(let feature of item.features) {
          featureIds.push(feature.id)
        }
        this.group.get('features')?.setValue(featureIds)
      }
  }
    



  finish() {
      if(this.data.isEdit && this.group.valid) {
        console.log(this.group)
        console.log('update')
        this._adminTrackService.updateTrack(this.data.item.id,this.group).subscribe({
          next: (response) => {
            console.log(response)
            this.close(true);
          },
          error: (err) => {
            console.log(err)
            this.close();
          }
        })
        return
      }

      if(this.group.valid) {
        console.log('insert')
        this._adminTrackService.addToFormData(this.group)
        this._adminTrackService.addTrack().subscribe({
          next: (response) => {

            this.close(true);
          },
          error: (err) => {
            this.close()
          }
        })
      }
    console.log('finish')
  }

  resetToDefaultValues() {
      if(this.data.isEdit) {
        this.fillForm(this.data.item)
        return
      }
      this.group.reset()
  }

  close(state: boolean = false): void {
      this.dialogRef.close(state);
  }

  compareOwners(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2
  }

  onFileSelected(event: any, control: string) {
    let file = event.target.files[0] ?? null
    console.log(file.type)
    if (control === 'image' && file) {
      if (!this.imageTypes.includes(file.type)) {
        this._snackbar.showFailedMessage('You must provide an image!')
        return
      }
      if (file.size > this.maxImageSize) {
        this._snackbar.showFailedMessage('Image size cannot exceed 2MB!')
        return
      }
    } else if (control === 'track' && file) {
      if (!this.trackTypes.includes(file.type)) {
        this._snackbar.showFailedMessage('You must provide a track file!')
        return
      }
      if (file.size > this.maxTrackSize) {
        this._snackbar.showFailedMessage('Track size cannot exceed 3.5MBs!');
        return
      }
    }

    this.group.get(control)?.setValue(event.target.files[0] ?? null)

    if (this.group.get(control)?.value) {
      const reader = new FileReader()
      reader.readAsDataURL(this.group.get(control)?.value)

      reader.onload = (e) => {
        console.log(e.target?.result)
        if (control === 'track') {
          this.trackInfo = this.trackFile.nativeElement.value.split('\\')[2]
        } else if (control === 'cover') {
          console.log(this.group.get('cover')?.value)
          this.group.get('cover')?.setValue(file)
          this.selectedImageSrc = e.target?.result as string
          //this.image.nativeElement.src = e.target?.result;
        }
      };
    }
  }

  prepareDataToSend(): FormData {
      let formData = new FormData();

      return formData;
  }

  submitForm(): void {
      let data = this.prepareDataToSend();

      if(this.data.isEdit) {
        this.submitUpdate(data)
      }
      else {
        this.submitInsert(data)
      }
  }

  submitInsert(data: FormData): Observable<any> {
    return this.adminService.insert('tracks', data);
  }

  submitUpdate(data: FormData): Observable<any> {
    return this.adminService.update('tracks', data, this.data.item.id);
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe()
    }
  }
}
