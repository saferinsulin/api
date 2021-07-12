/* eslint no-console: 0, quotes: 0 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var calc = require('insulin-calc');
var compression = require('compression');
var helmet = require('helmet');

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

// process.stdout.write("Downloading " + data.length + " bytes\r");

// tests
process.stdout.write('Self-test: \n');
var passed = 0;
var r = calc.ongoingRate();
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 1 failed');
}
r = calc.ongoingRate(10, 10);
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 2 failed');
}
r = calc.ongoingRate(10);
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 3 failed');
}
r = calc.ongoingRate(NaN, NaN, NaN);
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 4 failed');
}
r = calc.ongoingRate(NaN, 8, NaN);
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 5 failed');
}
r = calc.ongoingRate(NaN, 8, 1);
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 6 failed');
}
r = calc.ongoingRate(1.3, 12.1, 1.0);
if (r.rateNum === 0) {
  passed += 1;
} else {
  process.stdout.write('Test 7 failed');
}
r = calc.ongoingRate(2.4, 12.1, 1.0);
if (r.rateNum === 0) {
  passed += 1;
} else {
  process.stdout.write('Test 8 failed');
}
r = calc.ongoingRate(8.6, 8.9, 1.0);
if (r.rateNum === 1) {
  passed += 1;
} else {
  process.stdout.write('Test 9 failed');
}
r = calc.ongoingRate(8, 11, 5);
if (r.rateNum === 3.6) {
  passed += 1;
} else {
  process.stdout.write('Test 10 failed');
}
r = calc.ongoingRate(8.2, 20, 1);
if (r.rateNum === 0.4) {
  passed += 1;
} else {
  process.stdout.write('Test 11 failed');
}
r = calc.ongoingRate(16, 11.5, 2);
if (r.rateNum === 4.8) {
  passed += 1;
} else {
  process.stdout.write('Test 12 failed');
}
r = calc.ongoingRate(11, 10.9, 1);
if (r.rateNum === 2) {
  passed += 1;
} else {
  process.stdout.write('Test 13 failed');
}
r = calc.ongoingRate(10.5, 12.7, 1);
if (r.rateNum === 0.8) {
  passed += 1;
} else {
  process.stdout.write('Test 14 failed');
}
r = calc.ongoingRate(11.1, 11.4, 2.2);
if (r.rateNum === 2.2) {
  passed += 1;
} else {
  process.stdout.write('Test 15 failed');
}
r = calc.ongoingRate(13, 10, 2);
if (r.rateNum === 4) {
  passed += 1;
} else {
  process.stdout.write('Test 16 failed');
}
r = calc.ongoingRate(13, 12.9, 2);
if (r.rateNum === 3) {
  passed += 1;
} else {
  process.stdout.write('Test 17 failed');
}
r = calc.ongoingRate(12.5, 13, 2);
if (r.rateNum === 3) {
  passed += 1;
} else {
  process.stdout.write('Test 18 failed');
}
r = calc.ongoingRate(11.7, 12.7, 2.2);
if (r.rateNum === 2.2) {
  passed += 1;
} else {
  process.stdout.write('Test 19 failed');
}
r = calc.ongoingRate(5.2, 5, 2.2);
if (r.rateNum === 0) {
  passed += 1;
} else {
  process.stdout.write('Test 20 failed');
}
r = calc.ongoingRate(6.2, 8.1, 2.2);
if (r.rateNum === 1.1) {
  passed += 1;
} else {
  process.stdout.write('Test 21 failed');
}
r = calc.ongoingRate(7.1, 7.1, 2.2);
if (r.rateNum === 1.1) {
  passed += 1;
} else {
  process.stdout.write('Test 22 failed');
}
r = calc.ongoingRate(5.1, 6.8, 1.1);
if (r.rateNum === 0) {
  passed += 1;
} else {
  process.stdout.write('Test 23 failed');
}
r = calc.ongoingRate(13.1, 24, 2.0);
if (r.rateNum === 1.1) {
  passed += 1;
} else {
  process.stdout.write('Test 24 failed');
}
r = calc.ongoingRate(5.8, 7, 2.0);
if (r.rateNum === 0) {
  passed += 1;
} else {
  process.stdout.write('Test 25 failed');
}
r = calc.ongoingRate(7, 3.1, 0);
if (r.rateNum === 0) {
  passed += 1;
} else {
  process.stdout.write('Test 26 failed');
}
r = calc.ongoingRate(7, 3.1, 0.1);
if (r.rateNum === 0) {
  passed += 1;
} else {
  process.stdout.write('Test 27 failed');
}
r = calc.ongoingRate(13, 15, 2);
if (r.rateNum === 2) {
  passed += 1;
} else {
  process.stdout.write('Test 28 failed');
}
r = calc.ongoingRate(14.2, 17, 3);
if (r.rateNum === 3) {
  passed += 1;
} else {
  process.stdout.write('Test 29 failed');
}
r = calc.ongoingRate(14.2, 27, 3);
if (r.rateNum === 1.6) {
  passed += 1;
} else {
  process.stdout.write('Test 30 failed');
}
r = calc.ongoingRate(12.3, 17.5, 2);
if (r.rateNum === 1.4) {
  passed += 1;
} else {
  process.stdout.write('Test 31 failed');
}
r = calc.ongoingRate(15, 13, 2);
if (r.rateNum === 4) {
  passed += 1;
} else {
  process.stdout.write('Test 32 failed');
}
r = calc.ongoingRate(16, 15, 3);
if (r.rateNum === 5.1) {
  passed += 1;
} else {
  process.stdout.write('Test 33 failed');
}
r = calc.ongoingRate(17.1, 17.1, 19);
if (r.rateNum === 18) {
  passed += 1;
} else {
  process.stdout.write('Test 34 failed');
}
r = calc.ongoingRate(NaN, NaN, NaN);
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 35 failed');
}
r = calc.createGovernance({ f: 'x' });
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 36 failed');
}
r = calc.startingRate(30);
if (r.rateNum === 4) {
  passed += 1;
} else {
  process.stdout.write('Test 37 failed');
}
r = calc.startingRate(11.2);
if (r.rateNum === 1) {
  passed += 1;
} else {
  process.stdout.write('Test 38 failed');
}
r = calc.startingRate(14.5);
if (r.rateNum === 2) {
  passed += 1;
} else {
  process.stdout.write('Test 39 failed');
}
r = calc.startingRate(15.6);
if (r.rateNum === 3) {
  passed += 1;
} else {
  process.stdout.write('Test 40 failed');
}
r = calc.startingRate(6.4);
if (r.rate === 'N/A') {
  passed += 1;
} else {
  process.stdout.write('Test 41 failed');
}
r = calc.startingRate(60);
if (r.rateNum === 4) {
  passed += 1;
} else {
  process.stdout.write('Test 42 failed');
}
r = calc.startingRate();
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 43 failed\n');
}
r = calc.startingRate('NULL');
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 44 failed');
}
r = calc.startingRate(-10.2);
if (r === false) {
  passed += 1;
} else {
  process.stdout.write('Test 45 failed');
}
r = calc.governance();
if (r === null) {
  passed += 1;
} else {
  process.stdout.write('Test 46 failed');
}
r = calc.governance('A2-BBC43-AEFF');
if (r === null) {
  passed += 1;
} else {
  process.stdout.write('Test 47 failed');
}
r = calc.governance('9403b059-b81c6b');
var d = r.date.substring(0, 33);
if (r.function === 'b') {
  passed += 1;
} else {
  process.stdout.write('Test 48a failed');
}
if (r.current === 5.9) {
  passed += 1;
} else {
  process.stdout.write('Test 48b failed');
}
if (r.last === 8.9) {
  passed += 1;
} else {
  process.stdout.write('Test 48c failed');
}
if (r.rate === 14.8) {
  passed += 1;
} else {
  process.stdout.write('Test 48d failed');
}
if (d === 'Fri Nov 01 2019 13:21:00 GMT+0000') {
  passed += 1;
} else {
  process.stdout.write('Test 48e failed');
}
r = calc.governance('0bc-a81c71');
d = r.date.substring(0, 33);
if (r.function === 'a') {
  passed += 1;
} else {
  process.stdout.write('Test 49a failed');
}
if (r.current === 18.8) {
  passed += 1;
} else {
  process.stdout.write('Test 49b failed');
}
if (r.last === null) {
  passed += 1;
} else {
  process.stdout.write('Test 49c failed');
}
if (r.rate === null) {
  passed += 1;
} else {
  process.stdout.write('Test 49d failed');
}
if (d === 'Fri Nov 01 2019 13:27:00 GMT+0000') {
  passed += 1;
} else {
  process.stdout.write('Test 49e failed');
}
process.stdout.write(`\nSelf-test results: ${passed}/57 tests passed\n`);
if (passed !== 57) {
  process.stdout.write('\n*** SELF-TEST FAIL: API CANNOT START ***\n');
  process.exit(1);
}

process.stdout.write('\nAll tests passed: API started');

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

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.stdout.write('\n\nAPI running\n\n');

module.exports = app;
