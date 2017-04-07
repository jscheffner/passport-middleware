[![Build Status](https://travis-ci.org/joshmallow/passport-middleware.svg?branch=master)](https://travis-ci.org/joshmallow/passport-middleware)

# passport-middleware

## Usage

First, you need to install the module:

```
npm install passport-middleware
```

Now you have to import it:
```
var passportMiddleware = require('passport-middleware);
```

Let's make sure, only logged in users can access your endpoint:

```
router.get('/', passportMiddleware.ensureAuthentication, someHandler);
```
Now, a user who isn't logged in will get a 401 status message.

You might also want to prevent people from accessing your ressource if they don't have the appropriate role:

```
router.get('/', passportMiddleware.authorization(['author', 'reader']), someHandler);
```

Now, a user with none of the roles 'author' or 'reader' will get a 403 status message. If you want to use this function, your user has to have a property named 'roles' which is an array of strings.

## ISC Licence

Copyright (c) 2016, Jonas Scheffner

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.