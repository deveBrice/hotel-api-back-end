let bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.utils');
let jwt = require('jsonwebtoken');
let asyncLib = require('async');
let validator = require('../validators/validators');
let models    = require('../models');

const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

//Routes
module.exports = {
    register: function(req, res) {
    
        // Params
        let email    = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let bio      = req.body.bio;

         validator.fieldsValidator(email, username, password);
         validator.usernameValidator(username);
         validator.emailValidator(email);
         validator.passwordValidator(password)
         
        asyncLib.waterfall([
          function(done) {
            models.User.findOne({
              attributes: ['email'],
              where: { email: email }
            })
            .then(function(userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
            });
          },
          function(userFound, done) {
            if (!userFound) {
              bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                done(null, userFound, bcryptedPassword);
              });
            } else {
              return res.status(409).json({ 'error': 'user already exist' });
            }
          },
          function(userFound, bcryptedPassword, done) {
            var newUser = models.User.create({
              email: email,
              username: username,
              password: bcryptedPassword,
              bio: bio,
              isAdmin: 0
            })
            .then(function(newUser) {
              done(newUser);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'cannot add user' });
            });
          }
        ], function(newUser) {
          if (newUser) {
            return res.status(201).json({
              'userId': newUser.id
            });
          } else {
            return res.status(500).json({ 'error': 'cannot add user' });
          }
        });
      },

    login: function(req, res) {

    }
}