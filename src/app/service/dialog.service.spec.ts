import { TestBed } from '@angular/core/testing';

import { DailogService } from './dialog.service';

describe('DailogService', () => {
  let service: DailogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
