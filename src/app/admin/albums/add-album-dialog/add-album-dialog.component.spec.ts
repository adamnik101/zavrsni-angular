import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumDialogComponent } from './add-album-dialog.component';

describe('AddAlbumDialogComponent', () => {
  let component: AddAlbumDialogComponent;
  let fixture: ComponentFixture<AddAlbumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlbumDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAlbumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
