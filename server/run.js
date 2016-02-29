var server = require('./server');
var database = require('./database');

database.connect(function(){

    require('./user-model');
    
    server.init();
    
});