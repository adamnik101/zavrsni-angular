import { TestBed } from '@angular/core/testing';

import { AdminGenreService } from './admin-genre.service';

describe('AdminGenreService', () => {
  let service: AdminGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
