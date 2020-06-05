import { TestBed, inject } from '@angular/core/testing';

import { MemoryService } from './memory.service';

describe('EmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryService]
    });
  });

  it('should be created', inject([MemoryService], (service: MemoryService) => {
    expect(service).toBeTruthy();
  }));
});
