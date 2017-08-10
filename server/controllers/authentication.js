const jwt = require ('jwt-simple');
const env = require('dotenv').config();
const User = require('../models/user.js');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  //sub = subject (who is this token about )
  //iat = issued at time (when this token issued)
  return jwt.encode({sub: user.id, iat: timestamp}, process.env.SECRET);
}

exports.signin = function(req, res, next){
  //user has already there email and pass auth, we just need to give them a token
  res.send( {token:tokenForUser(req.user)} );
}


//Logic for processing requests for authentication
exports.signup = function(req,res,next){
  const email = req.body.email;
  const password = req.body.password;

  //Check for both values before continuing
  if(!email || !password){
    return res.status(422).send({error:'You must provide an email AND password.'});
  }

  //See if a user with given email existss
  User.findOne({email:email},function(err, existingUser){
    if(err){return next(err)}

    //If a user with email does exists, return an error
    if(existingUser){
        return res.status(422).send({error:'Email is in use'});
    }

    //if a user with email does NOT exists, creat and save user recored
    const user = new User({
      email: email,
      password:password
    });

    user.save(function(err){
      if(err){return next(err)}
      //Respond to request indicating the user was created
      res.json({token: tokenForUser(user)});
    });
  })
  //res.send({sucess:true});
}
