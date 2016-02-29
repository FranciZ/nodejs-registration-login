var bcrypt      = require('bcrypt');
var mongoose    = require('mongoose');

module.exports = function(app){
    
    
    app.get('/check-login', function(req, res){
        
        // get user information stored into the session
        var user = req.session.user;
        
        if(req.session.user){
            // user is logged in
            console.log(req.session.user);
        }
        
        res.send(user);
        
    });
    
    app.get('/only-admin', function(req, res){
       
        if(req.session.user){
            res.send('You are cool: ', req.session.user);
        }else{
            res.sendStatus(401);
        }
        
    });
    
    app.post('/user', function(req, res){
       
        var userData = req.body;
        
        var User = mongoose.model('User');
        
        bcrypt.genSalt(10, function(err, salt) {
            // generate hash
            bcrypt.hash(userData.password, salt, function(err, hash) {
                
                // override userData.password with hash value
                userData.password = hash;
                
                var newUser = new User(userData);
                // save new user to the database
                newUser.save(function(err){
           
                    if(!err){
                        console.log(newUser);
                        res.send(newUser);
                    }else{
                        console.log(err);
                        res.sendStatus(409);
                    }

                });
                
            });
            
        });
        
    });
    
    app.post('/login', function(req, res){
       
        // { email:'user@mail.com', password:'plaintextpassword' }
        var userData = req.body;
        
        var User = mongoose.model('User');
        
        // search for the user using the email address
        User.findOne({ email : userData.email }, function(err, userDoc){
           
            // is there an error?
            if(!err){
                
                // has user been found?
                if(userDoc){
                    
                    // compare the hashed password in the db with the password sent from the user
                    bcrypt.compare(userData.password, userDoc.password, function(err, bcryptResult) {
                        
                        if(bcryptResult === true){
                            
                            // DO LOGGED IN STUFF
                            // set session that will last an hour
                            var hour = 3600000;
                            req.session.cookie.expires = new Date(Date.now() + hour);
                            req.session.cookie.maxAge = hour;
                            userDoc.password = null;
                            
                            // setting the user to session
                            req.session.user = userDoc;
                            
                            // send back the userDoc
                            res.send(userDoc);
                            
                        }else{
                            // wrong password
                            res.sendStatus(401);
                        }
                        
                        
                    });
                    
                }else{
                    // no user with this email
                    res.sendStatus(404);
                }
                
            }else{
                
                console.log(err);
                res.sendStatus(400);
                
            }
            
        });
        
    });
    
};