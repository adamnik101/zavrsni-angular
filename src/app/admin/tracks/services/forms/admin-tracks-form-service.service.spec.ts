import { TestBed } from '@angular/core/testing';

import { AdminTracksFormServiceService } from './admin-tracks-form-service.service';

describe('AdminTracksFormServiceService', () => {
  let service: AdminTracksFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTracksFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
