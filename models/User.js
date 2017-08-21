var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", function(err, db){
  if(!err){
    console.log("---Connected to the database---");
  }
})
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    forename:String,
    surname:String,
    email: {
        type: String,
        unique: false,
        lowercase: true
    },
    created: Date
});

module.exports =  mongoose.model('User', UserSchema)
