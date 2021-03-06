const passport = require('passport');
const User = require ('../models/user');
const env = require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


//create local Strategy
const localOptions = {usernameField:'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //verify this usernaem and password call done with the user
  // if if is correct username and password\
  //otherwise call call done with false
  User.findOne({email: email}, function(err, user){
    if(err){return done(err); }

    if(!user) {return done(null, false);}
    //compare passwords  is `password` = user.password
    user.comparePassword(password, function(err, isMatch){
      if(err){return done(err);}

      if(!isMatch) {return done(null, false);}

      return done(null, user);
    });
  });
});


//set up option for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey : process.env.SECRET
};

//Create JWT Strategy
//payload = decoded jwtToken  of sub/iat property we assigned
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //  see if the userId in the payload exists in our db, if so
  //  if it does, call 'done' with that user
  //  otherwise, call done without a user object
  User.findById(payload.sub, function(err, user){
    if(err) {return done(err, false);}

    if(user){
      done (null, user);
    }else{
      done(null, false);
    }
  });

})// end jwt strag

//Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
