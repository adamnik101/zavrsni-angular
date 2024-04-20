import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsFormDialogComponent } from './albums-form-dialog.component';

describe('AlbumsFormDialogComponent', () => {
  let component: AlbumsFormDialogComponent;
  let fixture: ComponentFixture<AlbumsFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumsFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
