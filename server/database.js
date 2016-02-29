var mongoose = require('mongoose');

exports.connect = function(cb){
    
    mongoose.connect('mongodb://localhost/user-registration-login');
    
    mongoose.connection.once('open', function(){

        console.log('Database conneted');
        
        if(cb){
            cb();
        }

    });
    
    mongoose.connection.on('error', function(err){

        console.log(err);

    });
    
};