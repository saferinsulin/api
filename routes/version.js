/* eslint no-console:0 */
var express = require('express');

var router = express.Router();

var apiVersion = (require('../node_modules/insulin-calc/package.json').version);
var serverVersion = (require('../package.json').version);

/**
 * @api {get} /version API/calculator module version
 * @apiName GetVersion
 * @apiGroup GET
 * @apiVersion 1.2.3
 *
 * @apiSuccess {String} api API / module version
 * @apiSuccess {String} server Server version
 */
router.get('/', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('======================================================');
  console.log({ ip: ip });
  var result = { api: apiVersion, server: serverVersion };
  if (result) {
    res.send(result);
  } else {
    res.statusCode = 400;
    res.statusMessage = 'InvalidParameters';
    res.send();
  }
});

/**
 * @api {post} /version API/calculator module version
 * @apiName PostVersion
 * @apiGroup POST
 * @apiVersion 1.2.3
 *
 * @apiSuccess {String} api API / module version
 * @apiSuccess {String} server Server version
 */
router.post('/', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('======================================================');
  console.log({ ip: ip });
  var result = { api: apiVersion, server: serverVersion };
  if (result) {
    res.send(result);
  } else {
    res.statusCode = 400;
    res.statusMessage = 'InvalidParameters';
    res.send();
  }
});

module.exports = router;
