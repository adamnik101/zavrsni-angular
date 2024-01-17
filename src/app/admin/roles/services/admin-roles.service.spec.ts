import { TestBed } from '@angular/core/testing';

import { AdminRolesService } from './admin-roles.service';

describe('AdminRolesService', () => {
  let service: AdminRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
