import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { MovieService } from './movies.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMoviesPage', 'state'], { state: () => ({
      movies: [],
      loading: false,
      error: false,
      pageNumber: 0,
      pageSize: 15,
      totalPages: 2,
      totalElements: 30
    })});

    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadMovies on init', async () => {
    movieService.getMoviesPage.and.returnValue(Promise.resolve());
    await component.ngOnInit();
    expect(movieService.getMoviesPage).toHaveBeenCalledWith(0, 15, undefined, undefined);
  });

  it('should apply filters', async () => {
    movieService.getMoviesPage.and.returnValue(Promise.resolve());
    component.filterYear = 2023;
    component.filterWinner = 'true';
    await component.applyFilters();
    expect(component.currentPage).toBe(0);
    expect(movieService.getMoviesPage).toHaveBeenCalledWith(0, 15, true, 2023);
  });

  it('should paginate correctly', async () => {
    movieService.getMoviesPage.and.returnValue(Promise.resolve());
    component.currentPage = 0;
    await component.goToPage(1);
    expect(component.currentPage).toBe(1);
    expect(movieService.getMoviesPage).toHaveBeenCalledWith(1, 15, undefined, undefined);

    await component.goToPage(-1);
    expect(component.currentPage).toBe(1);
  });

  it('should calculate start and end items correctly', () => {
    component.currentPage = 1;
    component.pageSize = 15;
    expect(component.getStartItem()).toBe(16);
    expect(component.getEndItem()).toBe(30);
  });
});
