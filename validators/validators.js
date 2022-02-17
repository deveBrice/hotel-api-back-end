const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

module.exports = {
    
    fieldsValidator: function(email, username, password) {
        if(email === null || username === null || password === null) {
            return res.status(400).json({'error': 'missing parameters'})
        }
    },

    usernameValidator: function(username) {

        if(username.length >= 13 || username.length <= 4) {
            return res.status(400).json({'error': 'wrong username(must be length 5 - 12)'})
        }
    },

    emailValidator: function(email) {
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
          }
    },

    passwordValidator: function(password) {
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
          }
    }

}