const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    firstname: req.body.firstname.trim(),
    lastname: req.body.lastname.trim(),
    education: req.body.education.trim()
  };

      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.firstname
      };

  return done(null, token, data);
  // const newUser = new User(userData);
  // newUser.save((err) => {
  //   if (err) { return done(err); }

  //   return done(null);
  // });
});