import { TestBed } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiServiceService', () => {
  let service: ApiServiceService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ]
    }).compileComponents();
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});