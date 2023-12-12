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




@NgModule({
    declarations: [


    TrackTableComponent,
      NoResultsComponent,
      HumanizeDatePipe,
      LoadingComponent
  ],
    exports: [
        TrackTableComponent,
        NoResultsComponent,
        HumanizeDatePipe,
        LoadingComponent

    ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterLink,
    MatRippleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    CdkDrag,
    CdkDropList,
    CdkDragPreview,
    CdkDragPlaceholder
  ]
})
export class SharedModule { }
