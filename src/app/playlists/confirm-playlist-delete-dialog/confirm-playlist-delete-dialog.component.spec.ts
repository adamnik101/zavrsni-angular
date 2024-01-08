import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPlaylistDeleteDialogComponent } from './confirm-playlist-delete-dialog.component';

describe('ConfirmPlaylistDeleteDialogComponent', () => {
  let component: ConfirmPlaylistDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmPlaylistDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPlaylistDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmPlaylistDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
