import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDetailComponent } from './genre-detail.component';

describe('GenreDetailComponent', () => {
  let component: GenreDetailComponent;
  let fixture: ComponentFixture<GenreDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreDetailComponent]
    });
    fixture = TestBed.createComponent(GenreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
