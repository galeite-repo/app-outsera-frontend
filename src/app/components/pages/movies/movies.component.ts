import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MovieService } from './movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  imports: [NgIf, NgFor, FormsModule]
})
export class MoviesComponent implements OnInit {
  movieService = inject(MovieService);
  filterYear: number | null = null;
  filterWinner: string = '';

  currentPage: number = 0;
  pageSize: number = 15;
  constructor() { }

  ngOnInit() {
    this.loadMovies()
  }

  applyFilters() {
    this.currentPage = 0;
    this.loadMovies();
  }

  async loadMovies() {
    const winnerFilter = this.filterWinner === 'true' ? true : this.filterWinner === 'false' ? false : undefined;
    const yearFilter = this.filterYear ?? undefined;

    await this.movieService.getMoviesPage(this.currentPage, this.pageSize, winnerFilter, yearFilter);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.movieService.state().totalPages) return;
    this.currentPage = page;
    this.loadMovies();
  }

  getStartItem(): number {
    return this.currentPage * this.pageSize + 1;
  }

  getEndItem(): number {
    const state = this.movieService.state();
    const end = (this.currentPage + 1) * this.pageSize;
    return end > state.totalElements ? state.totalElements : end;
  }
}
