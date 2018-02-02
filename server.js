// init project
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// body-parser
const bodyParser = require('body-parser');
// cookie-parser
const cookieParser = require('cookie-parser');
// passport
const passport = require('passport');
// twitter
const TwitterStrategy = require('passport-twitter').Strategy;
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
// session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// assert
const assert = require('assert');
//require/import the mongodb native drivers
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// using Node.js `require()`
const mongoose = require('mongoose');
// connection URL
const url = process.env.MONGOLAB_URI;      
// connection
const promise_connection = mongoose.connect(url, {
	useMongoClient: true
});
let db = mongoose.connection;
/******************************/
// set store
/******************************/
let store = new MongoDBStore(
      {
        uri: url,
        collection: "sessions"
      });
 // Catch errors
    store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });
/******************************/
// set USEs for app
/******************************/
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "https://the-pinterest-clone.glitch.me/twitter/return"
  },
  function(token, tokenSecret, profile, done) {
    if(profile) {
        let user = profile;
        userModel.findOne({displayName: profile.displayName, username: profile.username}, (err, doc) => {
          if(doc) {
            //do smth
          }
          else {
            // create a user
            let obj = {displayName: profile.displayName, username: profile.username, pins: []};
            let user = new userModel(obj);
            user.save(function (err) {
              if (err) throw err;
            });
          }
        });
        return done(null, user);
      }
  
   else {
        return done(null, false);
      }
  }
));
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ 
  extended: true
}));
/***/
app.use(cookieParser())
/***/
app.use(session({
  secret: process.env.COOKIE_SECRET,
  cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
  store: store,
  resave: false,
  saveUninitialized: false
  //cookie: { secure: true }
}));
/***/
app.use(passport.initialize());
app.use(passport.session());
/***/
app.use(express.static('public'));
/******************************/
// mongoDB models and schemas
/******************************/
// if connection is success
promise_connection.then(function(db){
	console.log('Connected to mongodb');
});
// describe the schema
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
let userSet = new Schema({
    displayName: String,
    username: String,
    pins: []
});
// get the model
let userModel = mongoose.model('pinsuser', userSet);
/************************************************/
/******************************/
// handlers of pages
/******************************/
/************************************************/
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});
/************************************************/
app.get("/profile", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});
/************************************************/
app.get("/allpins", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});
/************************************************/
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/twitter/return',
passport.authenticate('twitter', { successRedirect: '/profile', failureRedirect: '/' }));
/************************************************/
/******************************/
// POST REQUESTS
/******************************/
/************************************************/
app.post("/logout", function(request, response) {
          request.logout();
          request.session.destroy(function(err) {
           response.status(200).clearCookie('connect.sid', {path: '/'}).json({error: 0});
          })
    });
/************************************************/
app.post("/user-inf", function(request, response) {
  // get user information
  // console.log(request.session);
  // console.log(request.isAuthenticated());
  if(request.session.hasOwnProperty("passport")) {
   userModel.findOne({displayName: request.session.passport.user.displayName, username: request.session.passport.user.username}, (err, document) => {
      if(document === null) response.json({isLogedIn: request.isAuthenticated(), displayName: ""});
      else {
           if(!err) {
             response.json({isLogedIn: request.isAuthenticated(), displayName: document.displayName, pins: document.pins});
           } 
         else {
           console.log("ERROR!: ", err);
           response.render("ERROR LOGIN try again please");
         } 
      }
    });
  } 
         
  else {
        response.json({isLogedIn: request.isAuthenticated()}); 
    }
});
/************************************************/
app.post("/add-pin", function(request, response) {
  // get user information
  if(request.session.hasOwnProperty("passport")) {
   userModel.findOne({displayName: request.session.passport.user.displayName, username: request.session.passport.user.username}, (err, document) => {
       if(!err) {
         // update user
            document.pins.push({img_url: request.body["imgurl"], description: request.body["description"]});
            document.save(function (err) {
              if (err) throw err;
              response.json({error: "none"});
            });
       } 
       else {
         console.log("ERROR!: ", err);
         response.render("ERROR again please");
       } 
    });
  } 
         
  else {
        response.json({isLogedIn: request.isAuthenticated()}); 
    }
});
/************************************************/
app.post("/delete-pin", function(request, response) {
  // get user information
  if(request.session.hasOwnProperty("passport")) {
   userModel.findOne({displayName: request.session.passport.user.displayName, username: request.session.passport.user.username}, (err, document) => {
       if(!err) {
         function whatShouldDelete(value) {
            if((value.img_url == request.body["imgurl"]) && (value.description == request.body["description"])) return true;
            else return false;
          }
         // update user
            document.pins.splice(document.pins.findIndex(whatShouldDelete), 1);
            document.save(function (err) {
              if (err) throw err;
              response.json({error: "none"});
            });
       } 
       else {
         console.log("ERROR!: ", err);
         response.render("ERROR again please");
       } 
    });
  } 
         
  else {
        response.json({isLogedIn: request.isAuthenticated()}); 
    }
});
/************************************************/
/******************************/
// user sessions handlers:
/******************************/
/************************************************/
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
