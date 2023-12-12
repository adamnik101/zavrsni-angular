import { TestBed } from '@angular/core/testing';

import { AdminAlbumService } from './admin-album.service';

describe('AdminAlbumService', () => {
  let service: AdminAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
