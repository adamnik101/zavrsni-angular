import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtistDialogComponent } from './edit-artist-dialog.component';

describe('EditArtistDialogComponent', () => {
  let component: EditArtistDialogComponent;
  let fixture: ComponentFixture<EditArtistDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditArtistDialogComponent]
    });
    fixture = TestBed.createComponent(EditArtistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
