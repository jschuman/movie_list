import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import MoviesIndex from './components/movies_index';
import MoviesShow from './components/movies_show';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={MoviesIndex} />
    <Route path="movies/:id" component={MoviesShow} />
  </Route>

);
