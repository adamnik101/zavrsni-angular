import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AlbumService} from "../albums/services/album.service";
import {inject} from "@angular/core";
import {Album} from "../albums/interfaces/album";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HomeModule} from "./home.module";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let albumService: AlbumService
  let albums : Album[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeModule],
      declarations: [HomeComponent],
      providers: [AlbumService]
    });

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance;
    albumService: TestBed.inject(AlbumService)
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', waitForAsync(() => {
    // Use async/await to wait for the asynchronous operation
    albumService.getLatest().subscribe({
      next: (response) => {
        albums = response

      }
    });
    expect(albums.length).toBeGreaterThan(0);
  }));
})
