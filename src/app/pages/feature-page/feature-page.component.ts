import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { MovieDetails } from '../../models/movie.model';
import { OmdbService } from '../../services/omdb.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-feature-page',
  templateUrl: './feature-page.component.html',
  styleUrls: ['./feature-page.component.scss']
})
export class FeaturePageComponent implements OnInit {
  public loading$: Observable<boolean>;
  public error$: Observable<string | undefined>;
  public movieDetails$: Observable<MovieDetails[] | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private omdbService: OmdbService,
    public stateService: StateService
  ) {
    this.loading$ = this.stateService.getLoading$();
    this.error$ = this.stateService.getError$();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.getMovies(params.title);
    });
  }

  getMovies(title: string = 'bridge') {
    this.movieDetails$ = this.omdbService.getMoviesFullDatilsByTitle(title, 2);
  }

  getMoviesDetailsByCount(
    moviesList: MovieDetails[],
    count: number
  ): MovieDetails[] {
    return moviesList.splice(0, count);
  }

  public isValidSearch = () => this.movieService.validSearch;
  public isNotFound = () => this.movieService.notFound;
  public isNotProvided = () => this.movieService.notProvided;
}
