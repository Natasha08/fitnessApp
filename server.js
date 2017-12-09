const path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  config = require('./webpack.config'),
  open = require('open'),
  app = express(),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  routes = require('./api/routes/index'),
  hour = 3600000;

const indexPath = path.join(__dirname, '/public/index.html');
const publicPath = express.static(path.join(__dirname, '/public'));

require('react');

const compiler = webpack(config);

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});
app.use(wdm);
app.use(webpackHotMiddleware(compiler));

app.set('port', (process.env.PORT || 3001));
app.use('/public', publicPath)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, application/json, Content-Type, Authorization, x-access-token');
    next();
});

app.get('/', function(req, res) {
  res.sendFile(indexPath)
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});

app.use('/api', routes);

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  // server.close(() => {
    process.exit(0);
  // });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
}

app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.send(err.message);
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

module.exports = app;
