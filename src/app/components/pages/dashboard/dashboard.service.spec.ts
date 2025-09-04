import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { DashboardService } from './dashboard.service';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies by year', async () => {
    const mockMovies = [{ id: 1, year: 2023, title: 'Movie A', studios: [], producers: [], winner: true }];
    const promise = service.getMoviesByYear(2023);
    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/winnersByYear?year=2023`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
    await promise;
    expect(service.stateWinnersByYear().movies).toEqual(mockMovies);
    expect(service.stateWinnersByYear().loading).toBe(false);
    expect(service.stateWinnersByYear().error).toBe(false);
  });

  it('should handle error when fetching movies by year', async () => {
    const promise = service.getMoviesByYear(2023);
    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/winnersByYear?year=2023`);
    req.error(new ErrorEvent('Network error'));
    await promise;
    expect(service.stateWinnersByYear().error).toBe(true);
    expect(service.stateWinnersByYear().loading).toBe(false);
  });

  it('should fetch max/min win intervals', async () => {
    const mockResponse = { min: [], max: [] };
    const promise = service.getMaxMinWinIntervals();
    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/maxMinWinIntervalForProducers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    await promise;
    expect(service.stateMaxMinInterval().min).toEqual([]);
    expect(service.stateMaxMinInterval().max).toEqual([]);
    expect(service.stateMaxMinInterval().loading).toBe(false);
    expect(service.stateMaxMinInterval().error).toBe(false);
  });

  it('should handle error when fetching max/min win intervals', async () => {
    const promise = service.getMaxMinWinIntervals();
    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/maxMinWinIntervalForProducers`);
    req.error(new ErrorEvent('Network error'));
    await promise;
    expect(service.stateMaxMinInterval().error).toBe(true);
    expect(service.stateMaxMinInterval().loading).toBe(false);
  });

  it('should fetch studios with win count', async () => {
    const mockResponse = { studios: [{ name: 'Studio A', winCount: 5 }, { name: 'Studio B', winCount: 3 }, { name: 'Studio C', winCount: 2 }, { name: 'Studio D', winCount: 1 }] };
    const promise = service.getStudiosWithWinCount();
    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/studiosWithWinCount`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    await promise;
    expect(service.stateStudiosWinCount().studios).toEqual(mockResponse.studios.slice(0, 3));
    expect(service.stateStudiosWinCount().loading).toBe(false);
    expect(service.stateStudiosWinCount().error).toBe(false);
  });

  it('should handle error when fetching studios with win count', async () => {
    const promise = service.getStudiosWithWinCount();
    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}/studiosWithWinCount`);
    req.error(new ErrorEvent('Network error'));
    await promise;
    expect(service.stateStudiosWinCount().error).toBe(true);
    expect(service.stateStudiosWinCount().loading).toBe(false);
  });

 
});