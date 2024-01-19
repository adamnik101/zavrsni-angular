import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchFormComponent } from './user-search-form.component';

describe('UserSearchFormComponent', () => {
  let component: UserSearchFormComponent;
  let fixture: ComponentFixture<UserSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
