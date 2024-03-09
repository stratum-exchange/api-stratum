var express = require("express");
var router = express.Router();
var model = require("../models/model.js");
var bodyParser = require("body-parser");

router.get("/", function (req, res, next) {
  res.status(400);
  next(null, req, res, next);
});

router.get("/api/v1/pairs", bodyParser.json(), model.getPairs);
router.get("/api/v1/baseAssets", bodyParser.json(), model.getBaseAssets);
router.get("/api/v1/routeAssets", bodyParser.json(), model.getRouteAssets);
router.get("/api/v1/configuration", bodyParser.json(), model.getRouteAssets);

router.get("/api/v1/updateAssets", bodyParser.json(), model.updateAssets);
router.get("/api/v1/updatePairs", bodyParser.json(), model.updatePairs);
router.get("/api/v1/circulatingSupply", bodyParser.json(), model.circulatingSupply);
// router.get('/api/v1/mergeTokenLists', bodyParser.json(), model.mergeTokenLists)

// additional price methods
router.get("/api/v1/priceInfo", bodyParser.json(), model.priceInfo);

// file serving for easier updates
router.get("/api/v1/fileserver/:type", bodyParser.json(), model.fileserver)

module.exports = router;
