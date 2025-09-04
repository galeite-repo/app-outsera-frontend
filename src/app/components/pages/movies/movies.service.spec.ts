import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { MoviePageResponse, MovieService } from './movies.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch movies page successfully', async () => {
    const mockResponse: MoviePageResponse = {
      content: [{ id: 1, year: 2023, title: 'Test Movie', studios: [], producers: [], winner: true }],
      pageable: { sort: { sorted: false, unsorted: true }, pageSize: 10, pageNumber: 0, offset: 0, paged: true, unpaged: false },
      totalElements: 1,
      totalPages: 1,
      last: true,
      first: true,
      sort: { sorted: false, unsorted: true },
      number: 0,
      numberOfElements: 1,
      size: 10
    };

    const promise = service.getMoviesPage(0, 10);

    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}?page=0&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    await promise;

    const state = service.state();
    expect(state.movies.length).toBe(1);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.totalPages).toBe(1);
  });

  it('should handle error when fetching movies', async () => {
    const promise = service.getMoviesPage(0, 10);

    const req = httpMock.expectOne(`${environment.OUTSERA_API_URL}?page=0&size=10`);
    req.error(new ErrorEvent('Network error'));

    await promise;

    const state = service.state();
    expect(state.error).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.movies.length).toBe(0);
  });
});
