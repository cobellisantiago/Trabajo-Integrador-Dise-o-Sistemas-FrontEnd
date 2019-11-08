import { TestBed } from '@angular/core/testing';

import { PolizaService } from './poliza.service';

describe('PolizaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolizaService = TestBed.get(PolizaService);
    expect(service).toBeTruthy();
  });
});
