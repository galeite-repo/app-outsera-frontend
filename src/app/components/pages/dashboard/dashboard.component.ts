import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NavbarComponent, NgFor, NgIf, FormsModule]
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService);
  selectedYear: number = 1993;
  constructor() { }

  ngOnInit() {
    this.dashboardService.getYearsWithMultipleWinners();
    this.dashboardService.getStudiosWithWinCount();
    this.dashboardService.getMaxMinWinIntervals();
    this.dashboardService.getMoviesByYear(this.selectedYear);
  }

   onSearch() {
    if (this.selectedYear) {
       this.dashboardService.getMoviesByYear(this.selectedYear);
    }
  }
}
