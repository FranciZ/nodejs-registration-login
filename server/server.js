var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var cors        = require('cors');
var bcrypt      = require('bcrypt');
var session     = require('express-session');
var app         = express();

exports.init = function(){
    
    app.use(allowCrossDomain);
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    
    app.use(session({
      genid: function(req) {
        return 'uniquevalue123'
      },
      secret: 'kjashd8p012i;eo0u912hew90932rkfje'
    }));


    
    app.listen(3000, function(){
       
        console.log('Server running on port 3000');
        
    });
    
};


// CORS middleware
// allows login from other domains
var allowCrossDomain = function(req, res, next) {
    
    // which domain to allow login and other requests from
    res.header('Access-Control-Allow-Origin', 'http://localhost:9001');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
    
}










