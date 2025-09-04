import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { DashboardService, MaxMinWinIntervalResponse, Movie, StudiosWithWinCountResponse, YearsWithMultipleWinnersResponse } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch movies by year', async () => {
    const mockMovies: Movie[] = [{ id: 1, year: 2023, title: 'Movie A', studios: [], producers: [], winner: true }];

    const promise = service.getMoviesByYear(2023);

    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/winnersByYear?year=2023`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);

    await promise;

    const state = service.stateWinnersByYear();
    expect(state.movies).toEqual(mockMovies);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });

  it('should handle error when fetching movies by year', async () => {
    const promise = service.getMoviesByYear(2023);

    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/winnersByYear?year=2023`);
    req.error(new ErrorEvent('Network error'));

    await promise;

    const state = service.stateWinnersByYear();
    expect(state.error).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('should fetch max/min intervals', async () => {
    const mockData: MaxMinWinIntervalResponse = { min: [], max: [] };
    const promise = service.getMaxMinWinIntervals();

    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/maxMinWinIntervalForProducers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    await promise;

    const state = service.stateMaxMinInterval();
    expect(state.min).toEqual([]);
    expect(state.max).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });

  it('should fetch studios with win count', async () => {
    const mockData: StudiosWithWinCountResponse = { studios: [{ name: 'Studio A', winCount: 5 }] };
    const promise = service.getStudiosWithWinCount();

    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/studiosWithWinCount`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    await promise;

    const state = service.stateStudiosWinCount();
    expect(state.studios).toEqual(mockData.studios.slice(0, 3));
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });

  it('should fetch years with multiple winners', async () => {
    const mockData: YearsWithMultipleWinnersResponse = { years: [{ year: 2000, winnerCount: 2 }] };
    const promise = service.getYearsWithMultipleWinners();

    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/yearsWithMultipleWinners`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    await promise;

    const state = service.stateYearWinner();
    expect(state.years).toEqual(mockData.years);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
  });
});
