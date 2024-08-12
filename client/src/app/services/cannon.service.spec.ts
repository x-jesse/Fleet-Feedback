import { TestBed } from '@angular/core/testing';

import { CannonService } from './cannon.service';

describe('CannonService', () => {
  let service: CannonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CannonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
