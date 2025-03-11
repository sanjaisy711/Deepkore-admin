import { TestBed } from '@angular/core/testing';

import { HttpinterceptorsadminService } from './httpinterceptors.service';

describe('HttpinterceptorsService', () => {
  let service: HttpinterceptorsadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpinterceptorsadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
