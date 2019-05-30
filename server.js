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

// connect to the server
var server = app.listen(4000, function(){
  console.log('Server started on 4000....');
});
