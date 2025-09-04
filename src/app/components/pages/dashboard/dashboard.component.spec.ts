import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DashboardService', [
      'getMoviesByYear', 
      'getMaxMinWinIntervals', 
      'getStudiosWithWinCount', 
      'getYearsWithMultipleWinners'
    ]);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dashboard service methods on init', () => {
    component.ngOnInit();
    expect(dashboardService.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(dashboardService.getStudiosWithWinCount).toHaveBeenCalled();
    expect(dashboardService.getMaxMinWinIntervals).toHaveBeenCalled();
  });

  it('should call getMoviesByYear on search', () => {
    component.selectedYear = 2023;
    component.onSearch();
    expect(dashboardService.getMoviesByYear).toHaveBeenCalledWith(2023);
  });

  it('should not call getMoviesByYear on search if year is null', () => {
    component.selectedYear = null as any;
    component.onSearch();
    expect(dashboardService.getMoviesByYear).not.toHaveBeenCalled();
  });
});
