var express = require("express"),
    app = express(),
    path = require('path'),
    ejs = require('ejs'),
    request = require('request'),
    config = require('./config/config');

var options = {
  url: 'https://www.blueapron.com/api/users/orders/upcoming?include_wine=false',
  headers: config.api
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/palette', function(req, res) {
  res.render('index');
});

app.get('/api/recipes', function(req, res) {
  app.curl(function(json) {
    var response = app.parseRecipes(json);
    res.send(response);
  });
});

app.parseRecipes = function(json) {
  var recipes = [];
  json.orders.forEach(function(order, key) {
    order.recipes.forEach(function(recipe) {
      delete recipe.product_pairings;
      recipes.push(recipe);
    });
  });
  return recipes;
};

app.curl = function(cb) {
  request(options, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      cb(json);
    } else {
      cb({"error": error, "code": response.statusCode, "message": response.statusMessage});
    }
  });
};

app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on port "+ this.address().port);
});
