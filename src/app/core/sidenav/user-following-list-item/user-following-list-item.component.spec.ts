import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowingListItemComponent } from './user-following-list-item.component';

describe('UserFollowingListItemComponent', () => {
  let component: UserFollowingListItemComponent;
  let fixture: ComponentFixture<UserFollowingListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFollowingListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFollowingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
