import { TestBed } from '@angular/core/testing';

import { AdminArtistService } from './admin-artist.service';

describe('AdminArtistService', () => {
  let service: AdminArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
