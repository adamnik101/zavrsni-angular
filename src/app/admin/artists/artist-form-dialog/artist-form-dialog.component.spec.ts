import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistFormDialogComponent } from './artist-form-dialog.component';

describe('ArtistFormDialogComponent', () => {
  let component: ArtistFormDialogComponent;
  let fixture: ComponentFixture<ArtistFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
