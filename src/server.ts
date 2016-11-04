// the polyfills must be the first thing imported in node.js
import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { routes } from './app/app.routes';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', createEngine({}));
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.urlencoded({
 extended: true
}));

// Serve static files
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));


import { ngApp } from './ng-app';

//API
routes.forEach((route) => {
  if (route.path === '**') {
    return;
  }

  app.get('/' + route.path, ngApp);
  if (route.data && route.data['post']) {
    app.post('/' + route.path, ngApp);
  }
});


app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});

