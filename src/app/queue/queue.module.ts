import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueRoutingModule } from './queue-routing.module';
import { QueueComponent } from './queue.component';
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {CdkScrollable} from "@angular/cdk/overlay";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    QueueComponent
  ],
  exports: [
    QueueComponent
  ],
    imports: [
        CommonModule,
        QueueRoutingModule,
        CdkDropList,
        CdkDrag,
        CdkDragHandle,
        CdkScrollable,
        MatButtonModule,
        MatIconModule
    ]
})
export class QueueModule { }
