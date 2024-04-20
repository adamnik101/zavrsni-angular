import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormDialogComponent } from './users-form-dialog.component';

describe('UsersFormDialogComponent', () => {
  let component: UsersFormDialogComponent;
  let fixture: ComponentFixture<UsersFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
