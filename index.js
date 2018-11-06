var express = require('express');

// var bodyParser = require('body-parser');//a
// var path = require('path');//a

var app = express();
var router = require('./router/main')(app);



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



// // Body Parser Middleware //a
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));




// app.get('/index', function(req, res){//a
// 	res.render('index');
// });//a
// app.get('/transportation', function(req, res){//a
// 	res.render('transportation');
// });//a

// //Accommodations Page
// app.get('/accommodations', function(req, res){//a
// 	res.render('accommodations');
// });//a
// app.post('/accSearch', function(req, res){
// 	console.log(connection.query("SELECT * FROM Accommodation WHERE location.ID IN (SELECT ID FROM Location WHERE City = '"+req.body.location+"')"));
// 	//var sLocation = req.body.location;
// 	//var sCheckIn = req.body.check_in;
// 	//var sCheckOut = req.body.check_out;
// });




// app.get('/activities', function(req, res){//a
// 	res.render('activities');
// });//a



var server = app.listen(3000, function(){
    console.log("[+] Express server has started on port 3000");
});
