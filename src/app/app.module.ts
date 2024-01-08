import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {PlaylistsModule} from "./playlists/playlists.module";
import {SharedModule} from "./shared/shared.module";
import { PlayerComponent } from './player/player.component';
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {HomeModule} from "./home/home.module";
import {QueueModule} from "./queue/queue.module";
import {MatIconModule} from "@angular/material/icon";
import {DurationPipe} from "./shared/pipes/duration.pipe";

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PlaylistsModule,
        CoreModule,
        SharedModule,
        HttpClientModule,
        MatSliderModule,
        FormsModule,
        QueueModule,
        MatIconModule,
        DurationPipe
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
