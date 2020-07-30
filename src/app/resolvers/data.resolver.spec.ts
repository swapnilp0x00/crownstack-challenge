import { TestBed } from '@angular/core/testing';

import { DataResolver } from './data.resolver';

describe('DataService', () => {
  let service: DataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
