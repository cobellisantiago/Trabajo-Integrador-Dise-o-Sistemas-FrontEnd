import { TestBed } from '@angular/core/testing';

import { MedidasDeSeguridadService } from './medidas-de-seguridad.service';

describe('MedidasDeSeguridadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedidasDeSeguridadService = TestBed.get(MedidasDeSeguridadService);
    expect(service).toBeTruthy();
  });
});
