import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSearchFormComponent } from './genre-search-form.component';

describe('GenreSearchFormComponent', () => {
  let component: GenreSearchFormComponent;
  let fixture: ComponentFixture<GenreSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
