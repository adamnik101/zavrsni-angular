import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallHeaderComponent } from './small-header.component';

describe('SmallHeaderComponent', () => {
  let component: SmallHeaderComponent;
  let fixture: ComponentFixture<SmallHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
