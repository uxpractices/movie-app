# Movie App

Movie App web application built using Angular v13. It uses the OMDb api to source movie information.

When you search a movie, the top 5 responses for that movie will be returned. You can click on the title of each movie to see additional details for the film.

The information will be based on IMDB data provided by a publicly available OMDB API. Documentation
can be found at http://www.omdbapi.com.

# Website Live URL
https://uxpractices.github.io/movie-app/

Consumes data from the OMDB API, on each key press updates the search results without reloading the page.

## Development server

Install yarn package manager

> npm install -g yarn@latest

> yarn install

Run `yarn start for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build & Deploy

Run `yarn build-prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

> yarn build-prod

> yarn install -g angular-cli-ghpages

> yarn build-deploy

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
