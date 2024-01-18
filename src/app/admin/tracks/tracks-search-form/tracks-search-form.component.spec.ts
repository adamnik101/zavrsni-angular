import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksSearchFormComponent } from './tracks-search-form.component';

describe('TracksSearchFormComponent', () => {
  let component: TracksSearchFormComponent;
  let fixture: ComponentFixture<TracksSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracksSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
