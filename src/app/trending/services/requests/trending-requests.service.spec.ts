import { TestBed } from '@angular/core/testing';

import { TrendingRequestsService } from './trending-requests.service';

describe('TrendingRequestsService', () => {
  let service: TrendingRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
