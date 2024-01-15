import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMultipleEntitiesDialog } from './delete-multiple-entities-dialog.component';

describe('DeleteDialogGenericComponent', () => {
  let component: DeleteMultipleEntitiesDialog;
  let fixture: ComponentFixture<DeleteMultipleEntitiesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMultipleEntitiesDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMultipleEntitiesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
