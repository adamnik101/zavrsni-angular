import { TestBed } from '@angular/core/testing';

import { UserRequestsService } from './user-requests.service';

describe('UserRequestsService', () => {
  let service: UserRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
