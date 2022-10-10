import { TestBed } from '@angular/core/testing';

import { SobreMiServiceService } from './sobre-mi-service.service';

describe('SobreMiServiceService', () => {
  let service: SobreMiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SobreMiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
