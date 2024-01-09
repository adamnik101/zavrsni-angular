import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackDialogComponent } from './add-track-dialog.component';

describe('AddTrackDialogComponent', () => {
  let component: AddTrackDialogComponent;
  let fixture: ComponentFixture<AddTrackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrackDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
