import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavLinksComponent } from './admin-nav-links.component';

describe('AdminNavLinksComponent', () => {
  let component: AdminNavLinksComponent;
  let fixture: ComponentFixture<AdminNavLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNavLinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNavLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
