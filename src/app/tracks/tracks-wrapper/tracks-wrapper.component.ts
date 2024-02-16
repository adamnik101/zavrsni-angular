import {Component, Input} from '@angular/core';
import { Track } from 'src/app/shared/interfaces/track';
import {From} from "../../shared/interfaces/from";
import {TrackRowComponent} from "../track-row/track-row.component";

@Component({
  selector: 'app-tracks-wrapper',
  standalone: true,
  imports: [
    TrackRowComponent
  ],
  templateUrl: './tracks-wrapper.component.html',
  styleUrl: './tracks-wrapper.component.scss'
})
export class TracksWrapperComponent {
  @Input() from!: From;
  @Input() tracks!: Track[];

}
