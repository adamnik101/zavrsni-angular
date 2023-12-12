import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTableComponent } from './track-table.component';

describe('TrackTableComponent', () => {
  let component: TrackTableComponent;
  let fixture: ComponentFixture<TrackTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackTableComponent]
    });
    fixture = TestBed.createComponent(TrackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
