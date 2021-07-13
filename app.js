/* eslint no-console: 0, quotes: 0 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var calc = require('insulin-calc');
var compression = require('compression');
var helmet = require('helmet');

var selfTest = require('./selftest');

var indexRouter = require('./routes/index');
var startInsulinRouter = require('./routes/start');
var continueInsulinRouter = require('./routes/continue');
var checkRouter = require('./routes/check');
var versionRouter = require('./routes/version');

var app = express();

var apiVersion = (require('./node_modules/insulin-calc/package.json').version);
var serverVersion = (require('./package.json').version);

process.stdout.write('\n======== SAFERINSULIN.ORG API ========\n\n');
process.stdout.write(`      Server version: ${serverVersion}\n`);
process.stdout.write(`      API version: ${apiVersion}\n\n`);

// Set Content Security Policies
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", "'unsafe-eval'"],
    },
  }),
);

app.use(compression());

selfTest.start();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/', indexRouter);
app.use('/v1/start', startInsulinRouter);
app.use('/v1/continue', continueInsulinRouter);
app.use('/v1/check', checkRouter);
app.use('/version', versionRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.statusCode = 400;
  res.statusMessage = 'InvalidApiCall';
  res.send();
});

process.stdout.write('\n\nAPI running\n\n');

module.exports = app;
