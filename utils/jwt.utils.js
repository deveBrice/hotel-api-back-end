let jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = '$2y$10$6lN9am3P/gKidcYKCpkDjOkNI.pQoqCXlsK7knBOyoraYYaiFm5wC';

module.exports = {
  generateTokenForUser: function(userData) {
      return jwt.sign({
          userId: userData.id,
          isAdmin: userData.isAdmin
      }, 
        JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      })
  },

  parseAuthorization: function(authorization) {
      return (authorization !== null) ? authorization.replace('Bearer ', '') : null;
  },

  getUserId: function(authorization) {
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization);
    if(token !== null) {
        try {
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken !== null) {
                userId = jwtToken.userId
            }
        } catch(err) {}
    }
    return userId;
  }
}