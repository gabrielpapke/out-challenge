import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { movieDataMock } from '@mocks/movies-data.mock';
import { multipleWinnersMock } from '@mocks/multiple-winners.mock';
import { producersIntervalMock } from '@mocks/producers-interval.mock';
import { studiosWinCountMock } from '@mocks/studios-win-count.mock';
import { IMovieFilter } from '@pages/list/interfaces/movies-filter.interface';
import { of } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MoviesService,
      ],
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMovies with parameters and return expected data', (done) => {
    const mockResponse = structuredClone(movieDataMock);

    const params: Partial<IMovieFilter> = { page: 0, size: 15, year: '2000' };
    const getSpy = spyOn(service, 'get').and.returnValue(of(mockResponse));

    service.getMovies(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);

      done();
    });

    expect(getSpy).toHaveBeenCalledWith('movies', params);
  });

  it('should call getMovies without parameters and return expected data', (done) => {
    const mockResponse = structuredClone(movieDataMock);

    const getSpy = spyOn(service, 'get').and.returnValue(of(mockResponse));

    service.getMovies().subscribe((response) => {
      expect(response).toEqual(mockResponse);

      done();
    });

    expect(getSpy).toHaveBeenCalledWith('movies', undefined);
  });

  it('should call getYearsMultipleWinners and return expected data', (done) => {
    const mockResponse = structuredClone(multipleWinnersMock);

    const getSpy = spyOn(service, 'get').and.returnValue(of(mockResponse));

    service.getYearsMultipleWinners().subscribe((response) => {
      expect(response).toEqual(mockResponse);

      done();
    });

    expect(getSpy).toHaveBeenCalledWith('movies', {
      projection: 'years-with-multiple-winners',
    });
  });

  it('should call getStudiosWithWinCount and return expected data', (done) => {
    const mockResponse = structuredClone(studiosWinCountMock);

    const getSpy = spyOn(service, 'get').and.returnValue(of(mockResponse));

    service.getStudiosWithWinCount().subscribe((response) => {
      expect(response).toEqual(mockResponse);

      done();
    });

    expect(getSpy).toHaveBeenCalledWith('movies', {
      projection: 'studios-with-win-count',
    });
  });

  it('should call getProducersAwardsInterval and return expected data', (done) => {
    const mockResponse = structuredClone(producersIntervalMock);

    const getSpy = spyOn(service, 'get').and.returnValue(of(mockResponse));

    service.getProducersAwardsInterval().subscribe((response) => {
      expect(response).toEqual(mockResponse);

      done();
    });

    expect(getSpy).toHaveBeenCalledWith('movies', {
      projection: 'max-min-win-interval-for-producers',
    });
  });
});
