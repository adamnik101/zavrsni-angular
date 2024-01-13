import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogGenericComponent } from './delete-dialog-generic.component';

describe('DeleteDialogGenericComponent', () => {
  let component: DeleteDialogGenericComponent;
  let fixture: ComponentFixture<DeleteDialogGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogGenericComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDialogGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
