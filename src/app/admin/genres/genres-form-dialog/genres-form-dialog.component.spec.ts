import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresFormDialogComponent } from './genres-form-dialog.component';

describe('GenresFormDialogComponent', () => {
  let component: GenresFormDialogComponent;
  let fixture: ComponentFixture<GenresFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenresFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
