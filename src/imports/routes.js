import {
  HomeView,
  NotFoundView,
} from './components/views';
import { IndexRoute, Route } from 'react-router';

import { MainLayout } from './components/layouts';
import React from 'react';

const routes = (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={HomeView} />
    <Route path="*" component={NotFoundView} />
  </Route>
);

export default routes;
