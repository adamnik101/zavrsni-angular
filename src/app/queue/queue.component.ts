import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { QueueService } from './services/queue.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// @ts-ignore
import { default as ColorThief } from 'colorthief/dist/color-thief.mjs';
import { ColorThiefService } from '../shared/services/color-thief.service';
import { AudioService } from '../audio/audio.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { transitionAnimation } from '../animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {Track} from "../shared/interfaces/track";
import {Artist} from "../artists/interfaces/artist";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          translateY: 0,
          opacity: '0.5',
        })
      ),
      state(
        'closed',
        style({
          translateY: '100%',
        })
      ),
      transition('open => closed, closed => open', [animate('20s')]),
    ]),
  ],
})
export class QueueComponent {
  constructor(
    public queueService: QueueService,
    public audioService: AudioService,
    private _renderer2: Renderer2,
    private _colorThiefService: ColorThiefService,
    private _cdr: ChangeDetectorRef,
    private _breakpointObserver: BreakpointObserver
  ) {}

  @ViewChild('trackList') trackList!: ElementRef;
  @ViewChild('queue') queue!: ElementRef;
  cover: string = '';
  width: number = 0;
  currentTrack: Track = {} as Track
  owner: Artist = {} as Artist
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.width = window.innerWidth;
    console.log(window.innerWidth);
  }
  @HostListener('document:keydown.escape', ['$event'])
  closeQueue(event: KeyboardEvent) {
    this.queueService.queueOpened = false
  }
  ngOnInit() {
    this.getScreenSize();
    this._breakpointObserver.observe(['max-width: 768px']).subscribe({
      next: (result: BreakpointState) => {
        console.log(result);
        if (result.matches) {
          console.log('mobile');
        } else {
          console.log('not mobile');
        }
      },
    });
  }
  ngOnChanges() {
    console.log('change');
  }
  ngAfterViewInit() {
    const playing =
      this.trackList.nativeElement.children[
        this.queueService.currentQueueIndex
      ];
    if (playing) {
      playing.scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center',
      });
    }
    //this._colorThiefService.getRgbColorsFromImage(this._renderer2, this.queueService.queue[this.queueService.currentQueueIndex].owner.cover, this.queue.nativeElement)

    this.queueService.currentTrack$.subscribe({
      next: (track) => {
        console.log(track)
        this.owner = track.owner
        const curr =
          this.trackList.nativeElement.children[
            this.queueService.currentQueueIndex
          ];
        if (curr) {
          /*const count = playing.offsetTop - this.trackList.nativeElement.scrollTop
          this.trackList.nativeElement.scrollBy({top: count, behavior: 'smooth'})*/
          curr.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        }
        if (track.cover) {
          this.cover = track.cover;
        } else {
          if (track.album) {
            this.cover = track.album.cover;
          } else {
            this.cover = track.owner.cover;
          }
        }

        //this.queue.nativeElement.style.backgroundImage = `url(${this.cover})`

        this._colorThiefService.getRgbColorsFromImage(this.cover, 'queue');
        this._cdr.detectChanges();
      },
    });
  }
  drop(event: CdkDragDrop<any, any>) {
    console.log(
      this.queueService.currentQueueIndex,
      event.currentIndex,
      event.previousIndex
    );

    moveItemInArray(
      this.queueService.queue,
      event.previousIndex,
      event.currentIndex
    );
    if (this.queueService.currentQueueIndex === event.previousIndex) {
      this.queueService.currentQueueIndex = event.currentIndex;
    } else if (
      event.currentIndex >= this.queueService.currentQueueIndex &&
      this.queueService.currentQueueIndex > 0 &&
      this.queueService.currentQueueIndex > event.previousIndex
    ) {
      this.queueService.currentQueueIndex--;
    } else if (
      this.queueService.currentQueueIndex <= event.previousIndex &&
      event.currentIndex <= this.queueService.currentQueueIndex &&
      this.queueService.currentQueueIndex < this.queueService.queue.length - 1
    ) {
      this.queueService.currentQueueIndex++;
    }
  }

  removeFromQueue(index: number) {
    console.log(this.queueService.remove(index));
  }
}
