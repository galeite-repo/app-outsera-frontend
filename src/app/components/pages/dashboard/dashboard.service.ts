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

export interface MoviesByYearResponse {
  movies: Movie[];
}

export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface MaxMinWinIntervalResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}

export interface StudioWinCount {
  name: string;
  winCount: number;
}

export interface StudiosWithWinCountResponse {
  studios: StudioWinCount[];
}

export interface YearWinner {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWinner[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private _stateWinnersByYear = signal<{
    movies: Movie[],
    loading: boolean,
    error: boolean
  }>({
    movies: [],
    loading: false,
    error: false,
  });

  private _stateYearWinner = signal<{
    years: YearWinner[],
    loading: boolean,
    error: boolean
  }>({
    years: [],
    loading: false,
    error: false,
  });

  private _stateStudiosWinCount = signal<{
    studios: StudioWinCount[],
    loading: boolean,
    error: boolean
  }>({
    studios: [],
    loading: false,
    error: false,
  });

  private _stateMaxMinInterval = signal<{
    min: ProducerWinInterval[],
    max: ProducerWinInterval[],
    loading: boolean,
    error: boolean
  }>({
    min: [],
    max: [],
    loading: false,
    error: false,
  });

  stateWinnersByYear = this._stateWinnersByYear.asReadonly();
  stateMaxMinInterval = this._stateMaxMinInterval.asReadonly();
  stateYearWinner = this._stateYearWinner.asReadonly();
  stateStudiosWinCount = this._stateStudiosWinCount.asReadonly();

  constructor(private http: HttpClient) { }


  async getMoviesByYear(year: number) {
    this._stateWinnersByYear.update((state) => ({ ...state, loading: true, error: false, movies: [] }));

    try {
      const data = await firstValueFrom(
        this.http.get<Movie[]>(`${environment.OUTSERA_API_URL}/winnersByYear?year=${year}`)
      );

      this._stateWinnersByYear.update((state) => ({
        ...state,
        movies: data ?? [],
      }));

    } catch (error) {
      this._stateWinnersByYear.update((state) => ({
        ...state,
        error: true,
      }));
    } finally {
      this._stateWinnersByYear.update((state) => ({
        ...state,
        loading: false,
      }));
    }
  }

  async getMaxMinWinIntervals() {
    this._stateMaxMinInterval.update((state) => ({ ...state, loading: true, error: false }));

    try {
      const data = await firstValueFrom(
        this.http.get<MaxMinWinIntervalResponse>(`${environment.OUTSERA_API_URL}/maxMinWinIntervalForProducers`)
      );

      if (data) {
        this._stateMaxMinInterval.update((state) => ({
          ...state,
          min: data.min,
          max: data.max,
        }));
      }
    } catch (error) {
      this._stateMaxMinInterval.update((state) => ({
        ...state,
        error: true,
      }));
    } finally {
      this._stateMaxMinInterval.update((state) => ({
        ...state,
        loading: false,
      }));
    }
  }

  async getStudiosWithWinCount() {
    this._stateStudiosWinCount.update((state) => ({ ...state, loading: true, error: false }));

    try {
      const data = await this.http
        .get<StudiosWithWinCountResponse>(`${environment.OUTSERA_API_URL}/studiosWithWinCount`)
        .toPromise();

      if (data?.studios) {
        this._stateStudiosWinCount.update((state) => ({
          ...state,
          studios: data.studios.slice(0, 3),
        }));
      }
    } catch (error) {
      this._stateStudiosWinCount.update((state) => ({
        ...state,
        error: true,
      }));
    } finally {
      this._stateStudiosWinCount.update((state) => ({
        ...state,
        loading: false,
      }));
    }
  }


  async getYearsWithMultipleWinners() {
    this._stateYearWinner.update((state) => ({ ...state, loading: true, error: false }));

    // Força detecção de mudanças antes da requisição
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      const data = await this.http
        .get<YearsWithMultipleWinnersResponse>(`${environment.OUTSERA_API_URL}/yearsWithMultipleWinners`)
        .toPromise();

      if (data?.years) {
        this._stateYearWinner.update((state) => ({
          ...state,
          years: data.years,
        }));
      }

    } catch (error) {
      this._stateYearWinner.update((state) => ({
        ...state,
        error: true,
      }));
    } finally {
      this._stateYearWinner.update((state) => ({
        ...state,
        loading: false,
      }));
    }
  }

}