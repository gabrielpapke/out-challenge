import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { BaseApiService } from './base-api.service';

describe('BaseApiService', () => {
  let service: BaseApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(BaseApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a GET request with the correct URL and parameters', () => {
    const endpoint = 'test-endpoint';
    const params = { key1: 'value1', key2: 'value2' };
    const mockResponse = { data: 'test-data' };

    service.get(endpoint, params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/${endpoint}?key1=value1&key2=value2`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should perform a GET request without parameters', () => {
    const endpoint = 'test-endpoint';
    const mockResponse = { data: 'test-data' };

    service.get(endpoint).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/${endpoint}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
