import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRowMenuComponent } from './track-row-menu.component';

describe('TrackRowMenuComponent', () => {
  let component: TrackRowMenuComponent;
  let fixture: ComponentFixture<TrackRowMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackRowMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackRowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
