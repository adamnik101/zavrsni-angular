import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsSearchFormComponent } from './albums-search-form.component';

describe('AlbumsSearchFormComponent', () => {
  let component: AlbumsSearchFormComponent;
  let fixture: ComponentFixture<AlbumsSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumsSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
