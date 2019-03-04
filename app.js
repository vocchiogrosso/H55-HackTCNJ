/////////////////////////
//| 1.0) NPM Packages |//
/////////////////////////

const expressEdge = require("express-edge");
const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const edge = require("edge.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');


const homePageController = require('./controllers/homePage')


/////////////////////////////////////
//| 1.1) Express + DB Integration |//
/////////////////////////////////////
const app = new express();

const mongoStore = connectMongo(expressSession);

app.use(connectFlash())

app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: true,
  saveUninitialized: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/database_name");

//////////////////
//| Middleware |//
//////////////////
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);


  //Call Controllers
  app.get("/", homePageController);

////////////////////////
//| X.X) Run On Port |//
////////////////////////
app.listen(8080, () => {
  console.log("App is live at: http://localhost:8080/");
});
