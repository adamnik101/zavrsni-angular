import { TestBed } from '@angular/core/testing';

import { RowMenuService } from './row-menu.service';

describe('RowMenuService', () => {
  let service: RowMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
