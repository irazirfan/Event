// import all node modules
var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

// parse all form data
app.use(bodyParser.urlencoded({ extended: true}));

// used for formating dates
var dateFormat = require('dateFormat');
var now = new Date();

/* this is view engine
   template parsing
   we are using ejs
*/
app.set('view engine', 'ejs');

// import all related JavaSript and CSS files to inject in our app
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

/*
	database connection details
	localhost - when is production mode, change this to your host
	user      - user name of the database
	password  - database password
	database  - database is the name of the database  
*/
const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb"
});

// global site title and base url
const siteTitle = "Simple Application";
const baseURL = "http://localhost:4000/"

// default page is laoded and the data is being called from mysql database
app.get('/', function(req, res) {

	// get the event list
	con.query("SELECT * FROM e_events ORDER BY e_start_date DESC", function (err, result){
		res.render('pages/index',{
			siteTitle: siteTitle,
			pageTitle: "Event List",
			items: result
		});	
	});

});

// add new event
app.get('/event/add', function(req, res) {

	res.render('pages/add-event.ejs',{
		siteTitle: siteTitle,
		pageTitle: "Add New Event",
		items: ''
	});
});

// post method
app.post('/event/add', function(req, res){
	var query =   "INSERT INTO `e_events` (e_name,e_start_date,e_end_date,e_desc,e_location) VALUES (";
	    query +=  " '"+req.body.e_name+"',";
	    query +=  " '"+dateFormat(req.body.e_start_date,"yyyy-mm-dd")+"',";
	    query +=  " '"+dateFormat(req.body.e_end_date,"yyyy-mm-dd")+"',";
	    query +=  " '"+req.body.e_desc+"',";
	    query +=  " '"+req.body.e_location+"')";

	con.query(query, function (err, result) {
		res.redirect(baseURL);
	});
});


// connect to the server
var server = app.listen(4000, function(){
  console.log('Server started on 4000....');
});
