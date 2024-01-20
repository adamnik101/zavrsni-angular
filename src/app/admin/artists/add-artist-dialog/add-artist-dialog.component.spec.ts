import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtistDialogComponent } from './add-artist-dialog.component';

describe('AddArtistDialogComponent', () => {
  let component: AddArtistDialogComponent;
  let fixture: ComponentFixture<AddArtistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArtistDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddArtistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
