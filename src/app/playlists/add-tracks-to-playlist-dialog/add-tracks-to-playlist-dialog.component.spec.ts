import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTracksToPlaylistDialogComponent } from './add-tracks-to-playlist-dialog.component';

describe('AddTracksToPlaylistDialogComponent', () => {
  let component: AddTracksToPlaylistDialogComponent;
  let fixture: ComponentFixture<AddTracksToPlaylistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTracksToPlaylistDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTracksToPlaylistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
