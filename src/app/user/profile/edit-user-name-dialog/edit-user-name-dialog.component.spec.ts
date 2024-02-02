import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserNameDialogComponent } from './edit-user-name-dialog.component';

describe('EditUserNameDialogComponent', () => {
  let component: EditUserNameDialogComponent;
  let fixture: ComponentFixture<EditUserNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserNameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
