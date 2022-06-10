const express = require('express');
const mongoose=require('mongoose')
//const router =express.Router();
const app  = express();
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

//const Assessment= require('./models/Assessment');


const Schedule = require('./Schedule.json');
const Sunday = require('./Sunday.json')
const Monday = require('./Monday.json')
const Tuesday = require('./Tuesday.json')
const Wednesday = require('./Wednesday.json')
const Thursday = require('./Thursday.json')
const Friday = require('./Friday.json')
const Saturday = require('./Saturday.json')

mongoose.connect('mongodb+srv://khaled:1234@cluster0.6ljqi.mongodb.net/?retryWrites=true&w=majority', ()=>
  console.log("DB connected")
  );

const courseWorkRoute=require('./routes/courseWork')

app.use('/courseWork',courseWorkRoute);


app.get('/Schedule', function (req, res) {
  return res.send(Schedule);
});

app.get('/Sunday', function (req, res) {
  return res.send(Sunday["Sunday"]);
});

app.get('/Monday', function (req, res) {
  return res.send(Monday["Monday"]);
});

app.get('/Tuesday', function (req, res) {
  return res.send(Tuesday["Tuesday"]);
});

app.get('/Wednesday', function (req, res) {
  return res.send(Wednesday["Wednesday"]);
});

app.get('/Thursday', function (req, res) {
  return res.send(Thursday["Thursday"]);
});

app.get('/Friday', function (req, res) {
  return res.send(Friday["Friday"]);
});

app.get('/Saturday', function (req, res) {
  return res.send(Saturday["Saturday"]);
});





// app.get('/Schedule/:day', function(req, res) {
//   const { day } = req.params;
//   return res.send(Schedule[day].toUpperCase());
// });


app.listen(3000, function() {
  console.log("[OK] = HTTP Server listening on: http://localhost:3000");
});