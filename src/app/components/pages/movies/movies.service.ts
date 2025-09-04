import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../../environments/environment";

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface MoviePageResponse {
  content: Movie[];
  pageable: {
    sort: { sorted: boolean; unsorted: boolean };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  sort: { sorted: boolean; unsorted: boolean };
  number: number;
  numberOfElements: number;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private _state = signal<{
    movies: Movie[];
    loading: boolean;
    error: boolean;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  }>({
    movies: [],
    loading: false,
    error: false,
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalElements: 0
  });

  constructor(private http: HttpClient) { }

  state() {
    return this._state();
  }

  async getMoviesPage(page: number, size: number, winner?: boolean, year?: number) {
    this._state.update(s => ({ ...s, loading: true, error: false, movies: [] }));
    // https://challenge.outsera.tech/api/movies?page=0&size=20&winner=true&year=2018
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (year) params.append('year', year.toString());
      if (winner) params.append('winner', winner.toString());

      const url = `${environment.OUTSERA_API_URL}?${params.toString()}`;

      const data = await firstValueFrom(this.http.get<MoviePageResponse>(url));

      this._state.update(s => ({
        ...s,
        movies: data.content ?? [],
        pageNumber: data.number,
        pageSize: data.size,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      }));

    } catch (error) {
      this._state.update(s => ({ ...s, error: true }));
    } finally {
      this._state.update(s => ({ ...s, loading: false }));
    }
  }
}