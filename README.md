# passport-middleware#

This module provides two methods that you can use in combination with Passport.js:

**ensureAuthentication** is a middleware function that checks if the user is authenticated.

**authorization** creates a middleware function that checks if the user has one of the accepted roles

##Example usage:##
```
#!Node.js

var ensureAuthentication = require('passport-middleware').ensureAuthentication;
router.get('/', ensureAuthentication, someHandler);
```
This would cause a 401 status message if the user was not autenticated. If he is authenticated, it will call someHandler.

```
#!Node.js

var authorization = require('passport-middleware).authorization;
router.get('/', authorization(['author', 'reader']), someHandler);
```
This would cause a 403 status message if the user had none of the roles 'author' and 'reader'. If he has, someHandler will be called. This only works if the user has some property named 'roles' which is an array of strings.