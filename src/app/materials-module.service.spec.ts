import { TestBed } from '@angular/core/testing';

import { MaterialsModuleService } from './materials-module.service';

describe('MaterialsModuleService', () => {
  let service: MaterialsModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialsModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
