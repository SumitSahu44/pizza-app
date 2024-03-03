const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
 function passportInit(passport)
{
    passport.use(new LocalStrategy({usernameField: 'email'},  async (email, password, done) => {
        // login
        // check if email exists 
      const user =  await User.findOne({email: email})
      if(!user)
      {
         return done(null, false, { message: 'No user with this email'})
      }

      bcrypt.compare(password, user.password).then(match => {
        if(match)
        {
            return done(null, user, {message: 'Login succesfully'})
        }
        return done(null, false, {message: 'Wrong Username or password'})
      }).catch(err => {
        return done(null, false, {message: 'Something went wrong'})
      })
           
    }))
    passport.serializeUser((user, done)=>{
         done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
      try {
          const user = await User.findOne({_id: id});
          done(null, user);
      } catch (err) {
          done(err);
      }
  });
}

module.exports = passportInit


    