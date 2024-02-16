import {Component, Input, ViewChild} from '@angular/core';
import {Track} from "../../shared/interfaces/track";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {RowMenuService} from "../services/row-menu.service";

@Component({
  selector: 'app-track-row-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './track-row-menu.component.html',
  styleUrl: './track-row-menu.component.scss'
})
export class TrackRowMenuComponent {
  @Input() track!: Track;

  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger

  constructor(public rowService: RowMenuService) {
  }
}
