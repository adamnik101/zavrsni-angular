import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPlaylistCardComponent } from './public-playlist-card.component';

describe('PublicPlaylistCardComponent', () => {
  let component: PublicPlaylistCardComponent;
  let fixture: ComponentFixture<PublicPlaylistCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicPlaylistCardComponent]
    });
    fixture = TestBed.createComponent(PublicPlaylistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
