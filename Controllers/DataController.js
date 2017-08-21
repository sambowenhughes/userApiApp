var fs = require("fs");
var User = require('../models/User');

//Decided to use a simple JSON file to store the data, easier for people to see its working rather than set up mongo
//note: I HAVE SET IT UP SO THE FILE ONLY STORES ONE USER AT A TIME ( again ease of viewing changes that were made )
let FILE = "/Users/sambowen-hughes/Desktop/UserApp/database.json";
var fileExists = fs.existsSync(FILE);
// File Contents saved to a USER object since there is no other user in the file contents
let USER = {};
//DATA class for ease of manipulation of data
function createObject (data) {
 this.user = data;

 this.getTimeCreated = function(){
   return data.created;
 }
 this.getEmail = function(){
   return data.email;
 }
 this.getSurname = function(){
   return data.surname;
 }
 this.getForename = function(){
   return data.forename;
 }
 this.getID = function(){
   return data._id;
 }
 this.setForename = function(newForename){
   data.forename = newForename;
 }
 //Could add more setters and getters if required
}

//If the data store is present (The file exists)
if (fileExists) {
  // get the data contained within the file
  var data = fs.readFileSync(FILE, 'utf8');
  // need to check that the file actually has data otherwise
  // an exception is thrown for parsing JSON data of data = null
  if(data){
    //set the USER object to the JSON content of the file (i.e. the user)
    USER = new createObject(JSON.parse(data));
  }
}else{
  console.log("- No data file set up, Please post form data to initiate data file -");
}

//Function that is called when data needs to be written to the file
//reducing repetition
function writeToFile(userData, res){
  var data = JSON.stringify(userData);
  fs.writeFile(FILE, data, function(err) {
    if(err) {
        return console.log(err);
        res.status(500).send('Fail - Something went wrong writing to file. <br><br>ERROR: '+err);
    }
    res.status(200).send('- NEW DATA HAS BEEN SAVED -<br><br>DATA:<b>'+data);
    res.end();
  });
}

module.exports = {
  getForm:function(req, res){
     res.sendFile('/Users/sambowen-hughes/Desktop/UserApp/form.html');
  },
  createUser:function(req, res){
    //create a new user instance
    var user = new User();
      //set up the user object using the body passed through from the input form
      user.forename = req.body.forename;
      user.surname = req.body.surname;
      user.email = req.body.email;
      user.created = Date.now(); //Date.now() creates a time stamp for when the instance is created

    user.save(function(err) {
        if (err)
            res.send(err);
        //Save the latest user to local file
        writeToFile(user, res);
    });
  },
  updateUserByFirstname:function(req,res){
    //IDeally this should be made more efficient and secure
    if(fileExists){
      var dataHasChanged = false;
      var nameToChange = req.params.nameToChange;
      var newName = req.params.updatedName;
      var forenameInDataFile = USER.getForename();

      if(forenameInDataFile == nameToChange){
        dataHasChanged = true;
        USER.setForename(newName);
      }else{
        res.status(500).send("ERROR: could not change forename, check that the name passed over is actually present in the data");
    }
      //if the data is changed then a need to rewrite the file is needed
      if(dataHasChanged){
        writeToFile(USER, res);
      }
  }else{
      res.status(404).send("ERROR: file was not found, post form data to initiate DATA FILE");
    }
},
removeAllData:function(req,res){
    if(fileExists){
      fs.truncate(FILE, 0, function(){
        res.send("All Data has been removed from: "+FILE);
      })
    }else{
      res.status(404).send("ERROR: file was not found");
    }
  },
  getUserInFile:function(req, res){
    if(fileExists){
        res.send("DATA: "+JSON.stringify(USER));
    }else{
      res.status(404).send("ERROR: file was not found");
    }
  }
}
