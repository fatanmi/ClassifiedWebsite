import { TestBed } from '@angular/core/testing';

import { MerchantService } from './marchant.service'

describe('MarchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantService = TestBed.get(MerchantService);
    expect(service).toBeTruthy();
  });
});
