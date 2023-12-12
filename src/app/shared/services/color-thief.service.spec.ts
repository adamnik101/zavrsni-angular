import { TestBed } from '@angular/core/testing';

import { ColorThiefService } from './color-thief.service';

describe('ColorThiefService', () => {
  let service: ColorThiefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorThiefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
