/*
 * Routing Information
 * - This file contains all information about routing.
 *   You can add/modify this module to route properly.
 * - Base URL is localhost, and all views are saved under /views/*
 *
 */

var mysql_connect = require('../config/db_config')();
var connection = mysql_connect.init();

// Check your log to see if there is any issue with DB connection.
var connection_test = mysql_connect.test_open(connection);


var bodyParser = require('body-parser');//a
var path = require('path');//a
var moment = require('moment'); // Time Formatter
var express = require('express');
var expressValidator = require('express-validator');

var currentuserID;
var currentgroupID;

// All routing information goes here.
module.exports = function(app)
{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(expressValidator());

  app.get('/index',function(req,res){
    if(currentuserID != null) {
      var q = 'select * from reservation where userID =' + currentuserID + ';'
      console.log("++++" + currentuserID);
      let rsvp, locations, transp, details = {};
      connection.query(q, function (err, result) {
        rsvp = result;
        if(err) {
          res.render('mypage.html', { user : currentuserID, error: err, result: result });
        }
        q = 'select * from transportation;';
        connection.query(q, function (err4, result4) {
          transp = result4;
          q = 'select * from location';
          connection.query(q, function (err2, result2) {
            locations = result2;
            const promises = [];
            for(i in rsvp) {
              const newPromise = new Promise((resolve, reject) => {
                q = 'select * from ' + rsvp[i].type + ' where ID=' + rsvp[i].typeId + ';';
                connection.query(q, function (err, result3) {
                  if(result3) {
                    details[result3[0].ID] = result3[0];
                    resolve('Found');
                  }
                  resolve('Not Found');
                });
              });
              promises.push(newPromise);
            }
            Promise.all(promises).then(data => {
              res.render('mypage.html', { user : currentuserID, 'result': rsvp, 'details': details, 'transp': transp, 'locations': locations, 'moment': moment });
            });
          })
        });
      });
    }
    else {
      res.render('index.html', { user : currentuserID });
      console.log("++++");
    }

  });

  app.get('/about',function(req,res){
    res.render('about.html', { user : currentuserID });
  });

  app.post('/cancel',function(req,res){
    var q = 'delete from Reservation where reservationId = '+ req.body.rsvpID + ';';
    connection.query(q, function (err, result) {
      if(err) {
        res.render('mypage.html', { user : currentuserID, error: err, result: result });
      }
      if(req.body.payID != null) {
        q = 'delete from payment where paymentId = '+ req.body.payID + ';';
        connection.query(q, function (err, result) {
          if(err) {
            res.render('mypage.html', { user : currentuserID, error: err, result: result });
          }
        });
        console.log(req.body.payID);
      }
      // res.render('mypage.html', { error: err, result: result });
      return res.redirect('/index');
    });
  });


// ------------------------- YB ------------------------------
    app.get('/',function(req,res){
      if(currentuserID){
        console.log("CURR: " + currentuserID);

      }else{
        console.log("No one");
        var q = 'select * from family;';
        connection.query(q, function (err, result) {
          res.render('index.html', { user : currentuserID, error: err, result: result });
      });

      }
    });

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/about',function(req,res){
  	currentuserID = null;
  	currentgroupID = null;
    res.render('about.html', { user : currentuserID });
  });

  app.get('/login',function(req,res){
  	res.render('login.html')
  });

  app.get('/signup',function(req,res){
  	res.render('signup.html')
  });

  app.get('/logout',function(req,res){
  	currentuserID = null;
  	currentgroupID = null;
  	//console.log("HI");

  	res.redirect('/');
  });

  app.get('/loggedin',function(req,res){
  	var transp;
  	var accom;
  	var error;
  	var book = 'SELECT * FROM Books B, Transportation T WHERE B.FamilyID =' + currentgroupID + ' AND T.TransportationID = B.TransportationID;';
  	connection.query(book, function (err, resultB) {
    	error = err;

	    var ac = 'SELECT * FROM Reserves R, Accomodation A WHERE R.FamilyID =' + currentgroupID + ' AND R.AccomodationID = A.ID;';
    	connection.query(ac, function (err, resultAc) {
        var act = 'SELECT * FROM ParticipatesIn P, Activity A WHERE P.FamilyID =' + currentgroupID + ' AND A.ActivityID = P.ActivityID;';
        connection.query(act, function (err, result) {
          res.render('loggedin.html', { error: err, transp: resultB, accom: resultAc, activity: result});
        });
  		});
    });

    	//console.log("NO"+ transp);

    	//res.render('loggedin.html', { error: error, transp: transp, accom: accom});
  	//res.render('signup.html')
  });




  app.post('/signup', function(req,res){ //SIGN UP POST REQUEST

  	var email = req.body.email;
  	var username = req.body.username;
  	var password = req.body.password;
  	var age = req.body.age;
  	var gender = req.body.gender;
  	var groupid = req.body.groupid;


  	req.checkBody('username', 'Username is Required').notEmpty();
  	req.checkBody('email', 'Email is Required').notEmpty();
  	req.checkBody('password', 'Password is Required').notEmpty();
  	var error = req.validationErrors();
	//console.log("f");

	var v = req.body.group1;



  	//console.log("" + v);

  	if(error){
  		console.log("Passed");
  	}else{

  		var validname; //CHECK FOR VALID USERNAME
  		var check = "SELECT * FROM PASSENGER WHERE NAME = '"+username+"';";
  			//console.log("" + q);
    		connection.query(check, function (err, result) {
    			//console.log(result);
    			//console.log(result.length);
      			if(err){
      				console.log("Error: Making G");
      			}else{
      				if(result.length > 0){
      					validname = false;

      				}else{
      					validname = true;
      				}
      				//console.log(validname);

      				if(validname == true){

    		if(v == "New"){
    			//console.log("We ar");
    			var k;

    			var gma = 'SELECT MAX(FamilyID) as famid FROM Family;';
  				//console.log("" + gma);
    			connection.query(gma, function (err, result) {
    				k = result[0].famid + 1;
    				var q = 'INSERT INTO Family VALUES ('+k+',1);';
  					//console.log("" + q);
    				connection.query(q, function (err, result) {
      				if(err){
      					console.log("Error: Making G");
      				}else{

      				}
      			//res.render('index.html', { error: err, result: result });
    				});

      			//res.render('index.html', { error: err, result: result });
    			});


    			var max = 'SELECT MAX(PassengerID) as id FROM Passenger;';
  				var j;
  				connection.query(max, function (err, result) {
  					j = result[0].id + 1;
  				//console.log(m);
  					var p = "INSERT INTO Passenger VALUES ("+j+",'"+username+"','"+password+"',"+age+",'"+gender+"',"+ k+");";
  					//console.log(p);
    				connection.query(p, function (err, result) {
      				if(err){
      					console.log("Error: Making P");
      				//console.log(err);
      				}else{
      					currentuserID = j;
      					currentgroupID = groupid;
      					res.redirect('/index');
      				}

      			//res.render('index.html', { error: err, result: result });
    				});

  				});


  			}else if(v == "Join"){ //JOINING A CURRENT GROUP
  				var ma = 'SELECT MAX(PassengerID) as id FROM Passenger;';
  				var m;
  				connection.query(ma, function (err, result) {
  					m = result[0].id + 1;
  					//console.log(m);
  					var validgroup;
  					var validgroup = "SELECT * FROM FAMILY WHERE FamilyID = '"+groupid+"';";
  					//console.log("" + q);
    				connection.query(validgroup, function (err, result) { //Check if Group Exists
      					if(err){
      						console.log("Error");
      					}else{
      						if(result.length > 0){ //Group Already Exists - Can add to this group

      							var p = "UPDATE FAMILY SET Size = Size + 1 WHERE FamilyID =" + groupid + ";";
  								console.log(p);
    							connection.query(p, function (err, result) {

      							});




      						var p = "INSERT INTO Passenger VALUES ("+m+",'"+username+"','"+password+"',"+age+",'"+gender+"',"+ groupid+");";
  							//console.log(p);
    						connection.query(p, function (err, result) {
      							if(err){
      								console.log("Error: Making P");
      							//console.log(err);
      							}else{
      								currentuserID = m;
      								currentgroupID = groupid;
      								res.redirect('/index');
      							}

      			//res.render('index.html', { error: err, result: result });
    						});


	      					}else{

    	  					}

      					}
      			//res.render('index.html', { error: err, result: result });
    				});

  				});

  			}
    	}else{
    		console.log("not Valid");
    	}





      			}
      			//res.render('index.html', { error: err, result: result });
    		});



  	}

  });

  app.post('/login', function(req,res){

  	var username = req.body.username;
  	var password = req.body.password;


  	req.checkBody('username', 'Username is Required').notEmpty();
   	req.checkBody('password', 'Password is Required').notEmpty();
  	var error = req.validationErrors();
  	//console.log("f");
  	var q = "SELECT * from Passenger WHERE Name ='" + username + "' AND Password ='"+ password+ "';";
      	connection.query(q, function (err, result) {
        	if(result.length > 0){
        		var r = result[0].Name;
        		//console.log(r);
        		currentuserID = result[0].PassengerID;
        		currentgroupID = result[0].GroupID;
        		//loggedinpage(app);
        		res.redirect('/index');
        		//res.render('loggedin.html')
        	}else{
        		console.log("No one");
        	}

      });

    	if(error){
    		console.log("Passed");
    	}else{

    	}

  });

  //---------------------------- Transportation Page ----------------------------
  app.get('/transportation', function(req, res){//a
    res.render('transportation', { user : currentuserID });
  });//a
  app.post('/traSearch', function(req, res){
    if (req.body.dCity==''){
    req.body.dCity='%'
  }
  if(req.body.dState==''){
    req.body.dState='%'
  }
  if(req.body.dCountry==''){
    req.body.dCountry='%'
  }
  if(req.body.sCity==''){
    req.body.sCity='%'
  }
  if(req.body.sState==''){
    req.body.sState='%'
  }
  if(req.body.sCountry==''){
    req.body.sCountry='%'
  }
  var q =''
  if(req.body.type=='Flight'){
  //Flights

    q ='SELECT T.Name, T.Type, T.Source AS \'SourceID\', T.Destination AS \'DestinationID\', L1.City AS \'Source\', L2.City AS \'Destination\', F.Fare, F.Class, T.ID FROM Transportation T, Flight F, Location L1, Location L2 WHERE L1.ID=T.Source AND L2.ID=T.Destination AND T.Type=\'flight\' AND F.ID=T.ID'+
    ' AND L2.City LIKE \''+req.body.dCity+'\' AND L2.State LIKE \''+req.body.dState+'\' AND L2.Country LIKE \''+req.body.dCountry+'\' AND L1.City LIKE \''+req.body.sCity+'\' AND L1.State LIKE \''+req.body.sState+'\' AND L1.Country LIKE \''+req.body.sCountry+'\''

  }else if(req.body.type=='Cruise'){
  //Cruises

    q ='SELECT T.Name, T.Type, L1.City AS \'Source\', L2.City AS \'Destination\', C.Cost, T.Source AS \'SourceID\', T.Destination AS \'DestinationID\', T.ID FROM Transportation T, Cruise C, Location L1, Location L2 WHERE L1.ID=T.Source AND L2.ID=T.Destination AND T.Type=\'cruise\' AND C.ID=T.ID'+
    ' AND L2.City LIKE \''+req.body.dCity+'\' AND L2.State LIKE \''+req.body.dState+'\' AND L2.Country LIKE \''+req.body.dCountry+'\' AND L1.City LIKE \''+req.body.sCity+'\' AND L1.State LIKE \''+req.body.sState+'\' AND L1.Country LIKE \''+req.body.sCountry+'\''



  }
  else if(req.body.type=='Car'){
  //Car Rentals
    q ='SELECT T.Name, T.Type, T.Source AS \'SourceID\', L1.City AS \'Source\', T.Destination AS \'DestinationID\', L2.City AS \'Destination\', R.CarType, R.Rent, T.ID FROM Transportation T, Car R, Location L1, Location L2 WHERE L1.ID=T.Source AND L2.ID=T.Destination AND T.Type=\'car\' AND R.ID=T.ID'+
    ' AND L2.City LIKE \''+req.body.dCity+'\' AND L2.State LIKE \''+req.body.dState+'\' AND L2.Country LIKE \''+req.body.dCountry+'\' AND L1.City LIKE \''+req.body.sCity+'\' AND L1.State LIKE \''+req.body.sState+'\' AND L1.Country LIKE \''+req.body.sCountry+'\''
  }
  connection.query(q, function (err, result){
    res.render('TraResults.html', { user : currentuserID, error: err, result: result});
  });
});

  app.post('/traPayment', function(req, res){
    // BOOK THE TRANSPORTATION IN THE DATABASE FOR THE USER HERE
    var q = 'select reservationID from reservation where reservationId = ' + req.body.rsvpID + ';';
    // rsvpID = Reservation.reservationId, ID = Reservation.typeId
    // var rid = req.body.rsvpID;

    connection.query(q, function(err, result){
        let T ={}
        var TYPE = ''
        var getType = 'SELECT Type FROM Transportation WHERE ID = '+ req.body.ID + ';';
        connection.query(getType, function(err, result){
          T = result;
          TYPE=T[0].Type;
          if(req.body.rsvpID === undefined) {
            var book = 'INSERT Reservation (typeId, type, userID, startDate, endDate, sourceLocation, destinationLocation) VALUES (' + req.body.ID + ', \''+TYPE+'\', '+currentuserID+', \''+req.body.startDate+'\', \''+req.body.endDate+'\', \''+req.body.src+'\', \''+req.body.dest+'\');';
            connection.query(book, function(err2, result2){
              if(err != null){
                console.log(err);
              }
              q = 'SELECT T.Name, T.Type, R.reservationID FROM Transportation T, Reservation R WHERE T.ID = ' + req.body.ID+' AND R.reservationID IN (SELECT MAX(reservationID) AS reservationID FROM Reservation)'
              connection.query(q, function (err, result){
                res.render('payment.ejs', { user : currentuserID, error: err, result: result});
              });
            });
          } else {
            q = 'SELECT T.Name, T.Type, R.reservationID FROM Transportation T, Reservation R WHERE T.ID = ' + req.body.ID+' AND R.reservationID=' + req.body.rsvpID;
            connection.query(q, function (err, result){
              res.render('payment.ejs', { user : currentuserID, error: err, result: result});
            });
          }
        });
    });
  });





  //---------------------------- Accommodations Page ---------------------------
  app.get('/accommodations', function(req, res){//a
    res.render('accommodations', { user : currentuserID });
  });//a

  app.post('/accSearch', function(req, res){
    if (req.body.City==''){
      req.body.City='%'
    }
    if(req.body.State==''){
      req.body.State='%'
    }
    if(req.body.Country==''){
      req.body.Country='%'
    }

    var q ='SELECT Name, ID, Type, Rate FROM Accommodation WHERE locationID IN (SELECT ID FROM Location WHERE City LIKE \''+req.body.City+'\' AND State LIKE \''+req.body.State+'\' AND Country LIKE \''+req.body.Country+'\')'

    connection.query(q, function (err, result){
      res.render('AccResults.html', { user : currentuserID, error: err, result: result});
    });
  });

  app.post('/accPayment', function(req, res){

    // BOOK THE ACCOMMODATION IN THE DATABASE FOR THE USER HERE
    var q = 'select reservationID from reservation where reservationId = ' + req.body.rsvpID + ';';
    // rsvpID = Reservation.reservationId, ID = Reservation.typeId
    // var rid = req.body.rsvpID;
    connection.query(q, function(err, result){
      if(req.body.rsvpID === undefined) {
        var book = 'INSERT Reservation (typeId, type, userID, startDate, endDate) VALUES ('+req.body.ID+', \'accommodation\', '+currentuserID+', \''+req.body.check_in+'\', \''+req.body.check_out+'\');';
        connection.query(book, function(err, result){
          if(result != null){
            console.log(result);
          }
          q = 'SELECT Name, Rate, reservationID FROM Accommodation, Reservation WHERE ID = ' + req.body.ID+' AND reservationID IN (SELECT MAX(reservationID) AS reservationID FROM Reservation)'
          connection.query(q, function (err, result){
            res.render('payment.ejs', { user : currentuserID, error: err, result: result});
          });
        });
      } else {
        q = 'SELECT Name, Rate, reservationID FROM Accommodation, Reservation WHERE ID = ' + req.body.ID+' AND reservationID=' + req.body.rsvpID;
        connection.query(q, function (err, result){
          res.render('payment.ejs', { user : currentuserID, error: err, result: result});
        });
      }
    });
  });


    // -------------------------- Activities Page ----------------------------
    app.get('/activities', function(req, res){//a
      res.render('activities', { user : currentuserID });
    });//a

    app.post('/actSearch', function(req, res){

    if (req.body.City==''){
      req.body.City='%'
    }
    if(req.body.State==''){
      req.body.State='%'
    }
    if(req.body.Country==''){
      req.body.Country='%'
    }

    var q ='SELECT Name, Description, ID, Cost FROM Activity WHERE locationID IN (SELECT ID FROM Location WHERE City LIKE \''+req.body.City+'\' AND State LIKE \''+req.body.State+'\' AND Country LIKE \''+req.body.Country+'\')'
    connection.query(q, function (err, result){
      res.render('ActResults.html', { user : currentuserID, error: err, result: result});
    });
  });

  app.post('/actPayment', function(req, res){
    // BOOK THE ACTIVITY IN THE DATABASE FOR THE USER HERE
    var q = 'select reservationID from reservation where reservationId = ' + req.body.rsvpID + ';';
    // rsvpID = Reservation.reservationId, ID = Reservation.typeId
    // var rid = req.body.rsvpID;
    connection.query(q, function(err, result){
      if(req.body.rsvpID === undefined) {
        var book = 'INSERT Reservation (typeId, type, userID, startDate) VALUES ('+req.body.ID+', \'activity\', '+currentuserID+', \''+req.body.date+'\')'
        connection.query(book, function(err, result){
          if(result != null){
            console.log(result);
          }
          q = 'SELECT Name, Cost, reservationID FROM Activity, Reservation WHERE ID = ' + req.body.ID+' AND reservationID IN (SELECT MAX(reservationID) AS reservationID FROM Reservation)'
          connection.query(q, function (err, result){
            res.render('payment.ejs', { user : currentuserID, error: err, result: result});
          });
        });
      } else {
        q = 'SELECT Name, Cost, reservationID FROM Activity, Reservation WHERE ID = ' + req.body.ID+' AND reservationID=' + req.body.rsvpID;
        connection.query(q, function (err, result){
          res.render('payment.ejs', { user : currentuserID, error: err, result: result});
        });
      }
    });
  });

  //add date(s) to reservation after payment is confirmed
  app.post('/confirmPayment', function(req, res){
    //put payment info in database
    var p = 'INSERT Payment (CardNumber, Name, Expiration, ReservationID) VALUES ('+req.body.CardNumber+', \''+req.body.Name+'\', \''+req.body.Expiration+'\', '+req.body.ID+')'
    connection.query(p, function(err, result){});

    //and add it's id number to the transaction.
    var q = 'UPDATE Reservation SET paymentId = (SELECT ID FROM Payment WHERE CardNumber = '+req.body.CardNumber+' AND Name = \''+req.body.Name+'\' AND Expiration = \''+req.body.Expiration+'\' AND ReservationID = '+req.body.ID+') WHERE reservationID = '+req.body.ID
    connection.query(q, function(err, result){
      res.render('mypage.html', { user : currentuserID, error: err, result: result});
    });
    return res.redirect('/index');
  });
}
