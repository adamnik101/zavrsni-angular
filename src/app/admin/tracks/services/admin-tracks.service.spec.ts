import { TestBed } from '@angular/core/testing';

import { AdminTracksService } from './admin-tracks.service';

describe('AdminTracksService', () => {
  let service: AdminTracksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTracksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
