var http = require("http");
var fs = require("fs");
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var expect = require('chai').expect;

var dataController = require('./Controllers/dataController');

app.use(bodyParser());

app.get('/', dataController.getForm);
//I understand that this is essentially get all data from file..
//ideally youd want a lookup to your database matching name/id (will happily implement if required)
app.get('/getUserSavedToFile', dataController.getUserInFile);
app.post('/createUser', dataController.createUser);
//Could implement this in a more safer way but purely for this demos purpose, works effectivley
app.put('/updateUserByFirstname/:nameToChange/:updatedName', dataController.updateUserByFirstname);
app.delete('/removeAllDataFromFile', dataController.removeAllData);

app.listen(8080, function () {
  console.log('Application listening on port 8080!')
})
