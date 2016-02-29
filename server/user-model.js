var mongoose = require('mongoose');

var schema = mongoose.Schema({
   
    email : { type:String, unique:true } ,
    password : String,
    cratedOn : { type:Date, default:Date.now },
    type    : String
    
});

mongoose.model('User', schema);