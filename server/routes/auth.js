const express = require('express');
const validator = require('validator');
const passport = require('passport');
const User = require('mongoose').model('User');
const multiparty = require('multiparty');
const fs = require('fs');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = new express.Router();


let email = '';
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}



router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  email = req.body.email;
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    console.log('userData after auth: ',userData)
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }


    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

router.post('/bio', (req,res,next)=>{
  User.findOne({ email: email }, (err, user) => {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.education = req.body.education;

    user.save(user, function(err){
      if(err) {
        console.log('ERROR!');
      } else {
        console.log('saved');
      }
    });
  });
});

router.post('/uploads', (req, res) => {

  let form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {

    let {path: tempPath, originalFilename} = files.imageFile[0];
    let newPath = "../../../uploads/" + originalFilename;
    let splitName = originalFilename.toLowerCase().split('.');

    fs.readFile(tempPath, (err, data) => {
      // make copy of image to new location
      fs.writeFile(newPath, data, (err) => {
        // delete temp image
        fs.unlink(tempPath, () => {
          res.send("File uploaded to: " + newPath);
        });
      }); 
    }); 

    if(splitName[1] === 'jpg' || splitName[1] === 'png' || splitName[1] ==='tiff' || splitName[1]==='jpeg' || splitName[1]==='gif') {
    User.findOne({ email: email }, (err, user) => {
    user.profilePic = newPath;

    user.save(user, function(err){
      if(err) {
        console.log('ERROR!');
      } else {
        console.log('saved');
      }
    });
    });
    } else {
      User.findOne({ email: email }, (err, user) => {
      user.resume = newPath;

      user.save(user, function(err){
        if(err) {
          console.log('ERROR!');
        } else {
          console.log('saved');
        }
      });
    });
    }
  })
})

module.exports = router;
