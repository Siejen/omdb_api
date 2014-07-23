var express = require("express");
var request = require("request");
var bodyParser = require('body-parser');

var app = express();

var favoritesArray = [];

app.use(bodyParser.urlencoded());

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function(req, res){ 
  var query = req.query.searchTerm;
  var url = "http://www.omdbapi.com/?s=" + query;
  request(url, function (error, response, body) {
  	if (!error) {
  		var data = JSON.parse(body);
  		res.render("results.ejs", {movieList: data.Search});
  	}
  });
});

app.get('/details', function(req, res){ 
  var query = req.query.imdbID;
  var url = "http://www.omdbapi.com/?i=" + query;	 
  request(url, function (error, response, body) {
  	if (!error) {
  		var data = JSON.parse(body);
  		res.render("details.ejs", {stuff : data});
  	}
  });
});

app.get('/favorites', function(req, res){ 
  		res.render("favorites.ejs", {favList : favoritesArray} );
  // 	}
  // });
});

app.post('/store', function(req, res){
	console.log(req.body.movie);
	favoritesArray.push(req.body.movie);
	res.redirect('/favorites');
});

app.listen(3000);
