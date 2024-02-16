import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksWrapperComponent } from './tracks-wrapper.component';

describe('TracksWrapperComponent', () => {
  let component: TracksWrapperComponent;
  let fixture: ComponentFixture<TracksWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracksWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
