import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { NavLinksComponent } from './nav-links/nav-links.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatRippleModule} from "@angular/material/core";
import {HeaderModule} from "../header/header.module";
import { UserPlaylistListComponent } from './user-playlist-list/user-playlist-list.component';
import {MatTabsModule} from "@angular/material/tabs";
import {UserModule} from "../../user/user.module";
import {CdkDragPlaceholder, CdkDropList} from "@angular/cdk/drag-drop";
import {AlbumListItemComponent} from "../../albums/album-list-item/album-list-item.component";



@NgModule({
  declarations: [
    SidenavComponent,
    NavLinksComponent,
    UserPlaylistListComponent,
  ],
  exports: [
    SidenavComponent
  ],
    imports: [
        CommonModule,
        HeaderModule,
        MatSidenavModule,
        NgOptimizedImage,
        RouterOutlet,
        MatListModule,
        MatRippleModule,
        RouterLink,
        RouterLinkActive,
        MatTabsModule,
        UserModule,
        CdkDropList,
        CdkDragPlaceholder,
        AlbumListItemComponent
    ]
})
export class SidenavModule { }
