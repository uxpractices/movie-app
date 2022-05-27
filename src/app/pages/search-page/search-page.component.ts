import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { OmdbService } from '../../services/omdb.service';
import { MovieDetails } from '../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../../services/state/state.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public loading$: Observable<boolean>;
  public error$: Observable<string | undefined>;
  public searchText = '';
  public movieDetails$: Observable<MovieDetails[] | undefined> | undefined;
  public errorLog: string = '';
  public selectedPlot = '';
  public searchFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    public stateService: StateService
  ) {
    this.loading$ = this.stateService.getLoading$();
    this.error$ = this.stateService.getError$();
  }

  ngOnInit() {
    this.searchText = '';
    this.route.params.subscribe((params: any) => {
      this.searchText = params.title;
      if (params.title) {
        this.getMovies(params.title);
      }
    });
  }

  onSeachChange() {
    if (this.searchText) {
      this.getMovies(this.searchText);
    }
  }

  getMovies(title: string) {
    this.movieDetails$ = this.omdbService.getMoviesFullDatilsByTitle(title, 5);
  }
}
