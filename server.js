var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// CORS
app.use('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var ingredients = [
	{
		id:"1231231",
		text:"Eggs"
	},{
		id:"sdfew",
		text:"Milk"
	},{
		id:"eosgfds",
		text:"butter"
	},{
		id:"poawjds",
		text:"suggar"
	}
];

app.get('/ingredients', function(req, res){
	res.send(ingredients);
});

app.post('/ingredients', function(req, res){
	var ingredient = req.body;
	console.log(ingredient);
	ingredients.push(ingredient);
	ingredients[1].text="Boiled Milk";
	res.send("Successfully posted ingredient.");
})
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(9000, function() {
    console.log("Server Running at : " + "http://localhost"+ ":" + "9000");
});
