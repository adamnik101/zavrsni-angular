import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRoundCardComponent } from './artist-round-card.component';

describe('ArtistRoundCardComponent', () => {
  let component: ArtistRoundCardComponent;
  let fixture: ComponentFixture<ArtistRoundCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistRoundCardComponent]
    });
    fixture = TestBed.createComponent(ArtistRoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
