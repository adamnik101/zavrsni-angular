import { TestBed } from '@angular/core/testing';

import { HomeRequestsService } from './home-requests.service';

describe('HomeRequestsService', () => {
  let service: HomeRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
