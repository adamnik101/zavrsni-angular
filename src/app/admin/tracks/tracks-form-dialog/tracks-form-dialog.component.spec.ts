import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksFormDialogComponent } from './tracks-form-dialog.component';

describe('TracksFormDialogComponent', () => {
  let component: TracksFormDialogComponent;
  let fixture: ComponentFixture<TracksFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracksFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
