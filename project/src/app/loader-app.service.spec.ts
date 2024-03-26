import { TestBed } from '@angular/core/testing';

import { LoaderAppService } from './loader-app.service';

describe('LoaderAppService', () => {
  let service: LoaderAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
