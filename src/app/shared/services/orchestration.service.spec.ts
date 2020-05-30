import { TestBed } from '@angular/core/testing';

import { OrchestrationService } from './orchestration.service';

describe('OrchestrationService', () => {
  let service: OrchestrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrchestrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
