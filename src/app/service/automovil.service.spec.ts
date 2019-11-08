import { TestBed } from '@angular/core/testing';

import { AutomovilService } from './automovil.service';

describe('AutomovilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutomovilService = TestBed.get(AutomovilService);
    expect(service).toBeTruthy();
  });
});
