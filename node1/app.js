var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/node1');

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(express.static(__dirname + '/Scripts'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.get('/', function(request, response) {
	var db = request.db;
	var userCollection = db.get('usercollection');
	userCollection.find({},{}, function(err, results){
		response.render('default', {
		title: 'Home',
		classname: 'home',
		users: results
		
		});
	});
});

app.get('/myFirstApp', function(request, response) {
	response.render('myFirstApp', {
		title: 'myFirstApp',
		classname: 'myFirstApp',
	});
});

app.post('/users', function(request, response){
    console.log('POST /');
    console.log(request.body);
    // retrieve data from DB and return
	var db = request.db;
	var userCollection = db.get('usercollection');
	userCollection.insert(request.body);
	userCollection.find({},{}, function(err, results){
		response.send(results);
	});
});

app.get('/users', function(request, response) {
	var db = request.db;
	var userCollection = db.get('usercollection');
	userCollection.find({},{}, function(err, results){
		response.send(results);
	});
});


app.get('/about', function(request, response) {
	response.render('default', {
	title: 'About Us',
	classname: 'about',	
	});
});


/*
app.get('*', function(request, response) {
	var name = request.params.name;
	response.send('Bad route');
});
*/

var server = app.listen(3000, function() {
	console.log('listening on port 3000');
});