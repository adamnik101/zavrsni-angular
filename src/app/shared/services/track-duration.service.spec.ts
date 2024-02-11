import { TestBed } from '@angular/core/testing';

import { TrackDurationService } from './track-duration.service';

describe('TrackDurationService', () => {
  let service: TrackDurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackDurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
