const express = require('express');
const app  = express();
const Schedule = require('./Schedule.json');
const Sunday = require('./Sunday.json')
const Monday = require('./Monday.json')
const Tuesday = require('./Tuesday.json')
const Wednesday = require('./Wednesday.json')
const Thursday = require('./Thursday.json')
const Friday = require('./Friday.json')
const Saturday = require('./Saturday.json')

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