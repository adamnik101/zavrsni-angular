import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { TrackTableComponent } from './track-table/track-table.component';
import {RouterLink} from "@angular/router";
import {MatRippleModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import { NoResultsComponent } from './components/no-results/no-results.component';
import { HumanizeDatePipe } from './pipes/humanize-date.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CdkDrag, CdkDragPlaceholder, CdkDragPreview, CdkDropList} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import { DividerComponent } from './components/divider/divider.component';
import { FormatDurationPipe } from './pipes/format-duration.pipe';




@NgModule({
    declarations: [


    TrackTableComponent,
      NoResultsComponent,
      HumanizeDatePipe,
      LoadingComponent,
      DividerComponent,
      FormatDurationPipe
  ],
  exports: [
    TrackTableComponent,
    NoResultsComponent,
    HumanizeDatePipe,
    LoadingComponent,
    FormatDurationPipe

  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterLink,
    MatRippleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    CdkDrag,
    MatIconModule,
    CdkDropList,
    CdkDragPreview,
    CdkDragPlaceholder
  ]
})
export class SharedModule { }
