import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {AlbumService} from "../services/album.service";
import {ActivatedRoute} from "@angular/router";
import {Album} from "../interfaces/album";
import {From} from "../../shared/interfaces/from";
import {Track} from "../../shared/interfaces/track";
import {QueueService} from "../../queue/services/queue.service";
import {AudioService} from "../../audio/audio.service";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent {
  private _albumService = inject(AlbumService)
  private _queueService = inject(QueueService)
  private _audioService = inject(AudioService)
  private _route = inject(ActivatedRoute)
  public album: Album = {} as Album
  public from : From = {} as From
  public isLoaded: boolean = false
  @ViewChild('background') background!: ElementRef
  ngOnInit() {
    this.isLoaded = false
    this.getAlbum()
  }

  private getAlbum() {
    this._route.paramMap.subscribe({
      next: (paramMap) => {
        const id = paramMap.get('id')
        if(id) {
          this._albumService.getAlbum(id).subscribe({
            next: (album) => {
              this.album = album
              this.from = {
                name : this.album.name,
                url: `/albums/${this.album.id}`,
                id: this.album.id,
                imageFrom: this.album.cover
              };
              console.log(album)
              this.isLoaded = true
              this.background.nativeElement.style.background = `
              linear-gradient(90deg, #000, transparent 100%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.5), #000), url('${this.album.cover}') right/600px repeat-x`
            }
          })
        }
      }
    })
  }

  playAlbum(tracks: Track[]) {
    this._queueService.addTracks(tracks, this.from)
    this._audioService.playTrack(this._queueService.queue[this._queueService.currentQueueIndex], this.from)
  }
}
