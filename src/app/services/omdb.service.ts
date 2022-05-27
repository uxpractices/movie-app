import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  finalize,
  forkJoin,
  map,
  Observable,
  of
} from 'rxjs';
import { OmdbConfig } from '../config/omdb-config';
import { Movie, MovieDetails, MovieList } from '../models/movie.model';
import { mergeMap } from 'rxjs/operators';
import { StateService } from './state/state.service';

@Injectable()
export class OmdbService {
  defaultOmdbUrl = `${OmdbConfig.baseUrl}?apikey=${OmdbConfig.apiKey}&type=${OmdbConfig.videoType}&r=${OmdbConfig.responseType}`;

  constructor(private http: HttpClient, public stateService: StateService) {}

  getMoviesByTitle(title: string): Observable<MovieList> {
    return this.http.get<MovieList>(
      `${this.defaultOmdbUrl}&s=${encodeURI(title)}&page=1`
    );
  }

  getMoviesFullDatilsByTitle(
    title: string,
    topCount: number
  ): Observable<MovieDetails[] | undefined> {
    this.stateService.setLoading(true);
    this.stateService.setError(undefined);
    return this.getMoviesByTitle(title).pipe(
      map((movies: MovieList) => {
        if (movies.Response === 'False') {
          this.stateService.setError(movies.Error);
          return of(undefined);
        }
        if (movies.Search) {
          if (movies.Response === 'True' && movies.Search.length > 0) {
            movies.Search = movies.Search.splice(0, topCount);
            return movies;
          }
        }
      }),
      // @ts-ignore
      mergeMap((movies: any) => {
        console.log(movies);
        if (movies) {
          let urls: Observable<MovieDetails>[];
          if (movies.Search) {
            urls = movies.Search.map((movie: Movie) => {
              return this.getMovieDetailsByImdbId(movie.imdbID);
            });
            return forkJoin(urls);
          }
        } else {
          return of(undefined);
        }
      }),
      mergeMap((movieDetails: MovieDetails[]) => {
        return of(movieDetails);
      }),
      catchError((error) => {
        if (error.status && error.status === 500) {
          this.stateService.setError(error.statusText);
        }
        return of(undefined);
      }),
      finalize(() => this.stateService.setLoading(false))
    );
  }

  getMovieDetailsByImdbId(imdbId: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.defaultOmdbUrl}&i=${imdbId}`);
  }

  getMovieDetailsByTitle(title: string): Observable<any> {
    return this.http.get(`${this.defaultOmdbUrl}&t=${title}`);
  }

  getMoviesAtPage(title: string, pageValue: number): Observable<any> {
    return this.http.get(
      `${this.defaultOmdbUrl}&s=${encodeURI(
        title
      )}*&page=${pageValue}&plot=full`
    );
  }
}
