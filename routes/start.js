/* eslint no-console: 0 */
var express = require('express');
var Calc = require('@saferinsulin/core');
var calc = new Calc();

var router = express.Router();

/**
 * @api {get} /v1/start/glucose/:glucose Starting insulin infusion
 * @apiName GetStart
 * @apiGroup GET
 * @apiVersion 1.2.3
 *
 * @apiParam {Number} glucose Current blood glucose reading (mmol/L)
 *
 * @apiSuccess {String} rate Rate to set insulin (including units/hr).
 * @apiSuccess {Number} rateNum Rate as Number (Float)
 * @apiSuccess {Object} advice Advice
 * @apiSuccess {String} advice.type Type of advice
 * @apiSuccess {String[]} advice.text Line by line advice text
 * @apiSuccess {String} hex Governance hexcode
 */

/**
 * @api {get} /v2/start/glucose/:glucose Starting insulin infusion
 * @apiName GetStart
 * @apiGroup GET
 * @apiVersion 2.0.2
 *
 * @apiParam {Number} glucose Current blood glucose reading (mmol/L)
 *
 * @apiSuccess {String} rate Rate to set insulin (including units/hr).
 * @apiSuccess {Number} rateNum Rate as Number (Float)
 * @apiSuccess {Object} advice Advice
 * @apiSuccess {String} advice.type Type of advice
 * @apiSuccess {String[]} advice.text Line by line advice text
 * @apiSuccess {String} hex Governance hexcode
 */
router.get('/glucose/:glucose', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('======================================================');
  console.log({ ip: ip, request: req.params });
  var glucose = parseFloat(req.params.glucose);
  // var glucose = 13.2;
  var result = calc.startingRate(glucose);
  if (result) {
    res.send(result);
  } else {
    res.statusCode = 400;
    res.statusMessage = 'InvalidParameters';
    res.send();
  }
});

/**
 * @api {post} /v1/start Starting insulin infusion
 * @apiName PostStart
 * @apiGroup POST
 * @apiVersion 1.2.3
 *
 * @apiParam {Number} glucose Current blood glucose reading (mmol/L)
 *
 * @apiSuccess {String} rate Rate to set insulin (including units/hr).
 * @apiSuccess {Number} rateNum Rate as Number (Float)
 * @apiSuccess {Object} advice Advice
 * @apiSuccess {String} advice.type Type of advice
 * @apiSuccess {String[]} advice.text Line by line advice text
 * @apiSuccess {String} hex Governance hexcode
 */

/**
 * @api {post} /v2/start Starting insulin infusion
 * @apiName PostStart
 * @apiGroup POST
 * @apiVersion 2.0.2
 *
 * @apiParam {Number} glucose Current blood glucose reading (mmol/L)
 *
 * @apiSuccess {String} rate Rate to set insulin (including units/hr).
 * @apiSuccess {Number} rateNum Rate as Number (Float)
 * @apiSuccess {Object} advice Advice
 * @apiSuccess {String} advice.type Type of advice
 * @apiSuccess {String[]} advice.text Line by line advice text
 * @apiSuccess {String} hex Governance hexcode
 */
router.post('/', function (req, res) {
  console.log(req.body);
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('======================================================');
  console.log({ ip: ip, request: req.body });
  var glucose = parseFloat(req.body.glucose);
  // var glucose = 13.2;
  var result = calc.startingRate(glucose);
  if (result) {
    res.send(result);
  } else {
    res.statusCode = 400;
    res.statusMessage = 'InvalidParameters';
    res.send();
  }
});

module.exports = router;
