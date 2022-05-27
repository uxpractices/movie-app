export interface MovieList {
  Response: ResponseType;
  Search?: Movie[];
  totalResults?: number;
  Error?: string;
  searchText?: string;
  page?: number;
}

export interface Movie {
  Poster: string;
  Title: string;
  Type: MovieTypes;
  Year: string;
  imdbID: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: MovieTypes;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export enum MovieTypes {
  Movie = 'movie',
  Series = 'series',
  Episode = 'episode',
  Any = '',
  NA = 'N/A'
}

export interface Rating {
  Source: string;
  Value: string;
}

export type ResponseType = 'True' | 'False';
export type NA = 'N/A';
