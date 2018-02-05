
const http = require('http');
const express = require('express');
const fs = require('fs');
const JSONC = require('json-comments');
const multer = require('multer');
const request = require('request');

const passport = require('passport');

var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

/* INITIALISATION */

/* Load server config */
var configString;

try{
    configString = fs.readFileSync('./config.json','utf8');
}catch(e){
    console.log("config: Error reading config file, using defaults");
    configString = fs.readFileSync('./config.sample.json','utf8');
}

const config = JSONC.parse(configString);

var app = express();

var server = http.createServer(app);

/* DATABASE */

var dbUrl = `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`;

MongoClient.connect(dbUrl, function(err, db){

  if(err){
    console.log('mongodb: ' + err.message); return;
  }
    console.log("mongodb: Connected to server");

/* PASSPORT AUTHENTICATION - provides middleware to authenticate the Dashboard page & API */


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//Enable authentication if it's on (ie. not dev mode)
var authfn = (config.authenticate)? passport.authenticate('local', {failureRedirect : '/login'}) : (req, res, next) => { next(); };

/* CONTROLLERS */

var Tokens = new(require('./controllers/Token.js'))(db);
var Shows = new (require('./controllers/Show.js'))(db);
var Episodes = new (require('./controllers/Episode.js'))(db, config, Shows);
var NowPlaying = new(require('./controllers/NowPlaying.js'))(db, config);
var CurrentShow = new(require('./controllers/CurrentShow.js'))(db, Shows, NowPlaying);

var Controllers = {
    Tokens : Tokens,
    Shows : Shows,
    Episodes : Episodes,
    NowPlaying : NowPlaying,
    CurrentShow : CurrentShow
}

/* ROUTES */

//Disable cache
app.use(function(req, res, next){
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
  res.setHeader("Pragma", "no-cache"); 
  res.setHeader("Expires", 0);
  next();
});

//Static hosts

app.use('/dashboard', authfn , express.static('dashboard/build')); //Dashboard
app.use('/', express.static('player/build')); //Public page

//REST API

var privateAPI = new (require('./route/PrivateAPI.js'))(app, db, authfn, Controllers);

//Public API

var publicAPI = new (require('./route/PublicAPI.js'))(app, db, Controllers);

//Utility API

var utilityAPI = new (require('./route/UtilityAPI.js'))(app, db, Tokens.tokenMiddleware(), Controllers);

//Anything else just goes to homepage (also enables the HTML5 page names)
//THIS MUST GO LAST!
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/player/build/index.html');
});

/* START SERVER */

if(Number.isInteger(config.port) == true){
    
  server.listen(config.port, function () {
    console.log('server: listening on port ' + config.port);
  });

}

    
});