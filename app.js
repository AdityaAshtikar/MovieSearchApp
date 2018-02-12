var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));

app.set("view engine", "ejs");


app.get("/", function(req, res){

	res.render("search");
});

app.get("/results", function(req, res){
	var query = String(req.query.search);
	query = query.toLowerCase();
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";

	request(url, function(error, response, body){
		if(!error && response.statusCode === 200){
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
		else{
			console.log("Something went wrong! ERROR: " + error);
		}
	});
});


app.listen(4000, function(){
	console.log("Movie App Server running at port 4000");
});