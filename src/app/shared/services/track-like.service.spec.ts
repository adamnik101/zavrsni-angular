import { TestBed } from '@angular/core/testing';

import { TrackLikeService } from './track-like.service';

describe('TrackLikeService', () => {
  let service: TrackLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
