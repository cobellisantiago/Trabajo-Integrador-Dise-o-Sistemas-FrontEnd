import { TestBed } from '@angular/core/testing';

import { CoberturaService } from './cobertura.service';

describe('CoberturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoberturaService = TestBed.get(CoberturaService);
    expect(service).toBeTruthy();
  });
});
