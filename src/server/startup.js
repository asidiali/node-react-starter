import { RouterContext, match } from 'react-router';

import { NotFoundView } from '../imports/components/views';
import React from 'react';
import assert from 'assert';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import {renderToString} from 'react-dom/server';
import routes from '../imports/routes';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

mongoose.Promise = Promise;

const webpackCompiler = webpack(webpackConfig);

const createApiRouter = () => {
  const router = express.Router();
  // Endpoints.generate(router);
  router.get('/v1/status', (req, res) => res.send({ status: 'success' }));
  return router;
}

const createAppRouter = () => {
  const router = express.Router();
  router.get('*', (req, res) => {
    match(
      { routes, location: req.url },
      (err, redirectLocation, renderProps) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        if (redirectLocation) {
          return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        let content;
        if (renderProps) {
          content = renderToString(<RouterContext {...renderProps} radiumConfig={{userAgent: req.headers['user-agent']}} />);
        } else {
          content = renderToString(<NotFoundView />);
          res.status(404);
        }
        res.render('index', { content });
      }
    );
  });

  return router;
}


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../core', 'template'));

app.use('/static', express.static(path.join(__dirname, '../../', 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    chunks: false,
  },
}));

app.use(webpackHotMiddleware(webpackCompiler, {
  noInfo: true,
}));

const apiRouter = createApiRouter();
const appRouter = createAppRouter();

app.use('/api', apiRouter);
app.use('/', appRouter);

app.listen(3000, () => {
  console.log(`
    ##### node-react-starter
    ##### Application started and listening on port 3000.
  `);
});
