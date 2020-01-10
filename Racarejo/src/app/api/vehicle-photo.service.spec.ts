import { TestBed } from '@angular/core/testing';

import { VehiclePhotoService } from './vehicle-photo.service';

describe('VehiclePhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiclePhotoService = TestBed.get(VehiclePhotoService);
    expect(service).toBeTruthy();
  });
});
