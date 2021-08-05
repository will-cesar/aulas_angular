import { TestBed } from '@angular/core/testing';

import { PrimeiroServicoService } from './primeiro-servico.service';

describe('PrimeiroServicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimeiroServicoService = TestBed.get(PrimeiroServicoService);
    expect(service).toBeTruthy();
  });
});
