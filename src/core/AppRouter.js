import { Router, browserHistory } from 'react-router';

import React from 'react';
import routes from '../imports/routes';

const AppRouter = props => ( // eslint-disable-line
  <Router history={browserHistory} routes={routes} />
);

export default AppRouter;
