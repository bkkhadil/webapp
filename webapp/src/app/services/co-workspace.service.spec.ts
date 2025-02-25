import { TestBed } from '@angular/core/testing';

import { CoWorkspaceService } from './co-workspace.service';

describe('CoWorkspaceService', () => {
  let service: CoWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
