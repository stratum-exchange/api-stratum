const express = require("express");
const compression = require("compression");
const routes = require("./routes/routes");
const morgan = require("morgan");
const helmet = require("helmet");
const https = require("https");
const auth = require("http-auth");
const model = require("./models/model.js");
const fs = require('fs');

/*  QTdEQTlBMDUwNzMxMTE3MDBFNDcyMTEwODBCOUE5RkEyMzFFNjMyMDhEMTc0NjQ1MEJGMkZDREVCNTU4OTlFQTowQTZDMkQyMkYxNDcwOTNFQ0NERUFFMzE4MTQ5NUE2RjUyNkUzREI1NzBDMkVFQTkzREI5QzEwOEZBQkNFOTc5 */
// var basic = auth.basic(
//   { realm: "solidly.exchange" },
//   function (username, password, callback) {
//     callback(
//       username ===
//         "A7DA9A05073111700E47211080B9A9FA231E63208D1746450BF2FCDEB55899EA" &&
//         password ===
//           "0A6C2D22F147093ECCDEAE3181495A6F526E3DB570C2EEA93DB9C108FABCE979"
//     );
//   }
// );

async function updateAssetsMiddleware() {
  try {
    await model.updateAssets();
  } catch (ex) {
    console.error("Error updating assets:", ex);
  }
}

async function updatePairsMiddleware() {
  try {
    await model.updatePairs();
  } catch (ex) {
    console.error("Error updating pairs:", ex);
  }
}

var app = express();

app.all("/*", function (req, res, next) {
  // CORS headers
  res.set("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,Authorization,Username,Password,Signature,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.all("/health", function (req, res, next) {
  res.status(200);
  res.json({
    status: 200,
    message: "health ok",
  });
});

app.use(morgan("dev"));

// app.use(auth.connect(basic))

app.use(helmet());
app.use(compression());

app.use("/", routes);

function handleData(req, res) {
  if (res.statusCode === 205) {
    if (res.body) {
      if (res.body.length === 0) {
        res.status(204);
        res.json({
          status: 204,
          message: "No Content",
        });
      } else {
        res.status(200);
        res.json(res.body);
      }
    } else {
      res.status(204);
      res.json({
        status: 204,
        message: "No Content",
      });
    }
  } else if (res.statusCode === 400) {
    res.status(res.statusCode);
    res.json({
      status: res.statusCode,
      message: "Bad Request",
    });
  } else if (res.statusCode === 401) {
    res.status(res.statusCode);
    res.json({
      status: res.statusCode,
      message: "Unauthorized",
    });
  } else if (res.statusCode) {
    res.status(res.statusCode);
    res.json(res.body);
  } else {
    res.status(200);
    res.json(res.body);
  }
}
app.use(handleData);
app.use(function (err, req, res) {
  if (err) {
    if (res.statusCode == 500) {
      res.status(250);
      res.json({
        status: 250,
        message: err,
      });
    } else if (res.statusCode == 501) {
      res.status(250);
      res.json({
        status: 250,
        message: err,
      });
    } else {
      res.status(500);
      res.json({
        status: 500,
        message: err.message,
      });
    }
  } else {
    res.status(404);
    res.json({
      status: 404,
      message: "Request not found",
    });
  }
});

var options = {};
https.globalAgent.maxSockets = 50;
app.set("port", 3033);
var server = null;
if (process.env.NODE_ENV === 'development') {
  server = require("http").Server(app);
} else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
  var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/app-dev.stratumexchange.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/app-dev.stratumexchange.com/fullchain.pem'),
  };
  server = require('https').createServer(options, app);
} else {
  console.error("Error: API-Environment not configured.")
}
server.listen(app.get("port"), async function () {
  console.log("api.stratum.exchange", server.address().port);
  module.exports = server;

  // once called when server started
  await updateAssetsMiddleware()
  console.log("Assets updated")
  await updatePairsMiddleware()
  console.log("Pairs updated")
});

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};
