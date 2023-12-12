import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksTableComponent } from './tracks-table.component';

describe('TracksTableComponent', () => {
  let component: TracksTableComponent;
  let fixture: ComponentFixture<TracksTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TracksTableComponent]
    });
    fixture = TestBed.createComponent(TracksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
