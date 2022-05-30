import { Injectable } from '@angular/core';
import { MovieDetails } from '../../models/movie.model';
import { OmdbService } from '../omdb/omdb.service';

@Injectable()
export class MovieService {
  movieDetails: MovieDetails[] = [];
  public validSearch: boolean = false;
  public notFound: boolean = false;
  public notProvided: boolean = false;

  constructor(private omdbService: OmdbService) {}

  addMovie(movieDetails: MovieDetails) {
    this.movieDetails = JSON.parse(<string>localStorage.getItem('movies'));
    this.movieDetails.push(movieDetails);
    localStorage.setItem('movies', JSON.stringify(this.movieDetails));
  }

  setStorage<T>(movies: Array<T>): void {
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  public searchMovie(title: string) {
    if (!title) {
      this.validSearch = false;
      this.notProvided = true;
      this.notFound = false;
    } else {
      return this.omdbService.getMoviesByTitle(title);
    }
  }
}
