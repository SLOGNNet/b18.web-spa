/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'dev':
  case 'development':
    module.exports = require('./config/webpack.prod')({env: 'development'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({env: 'test'});
    break;
  case 'stage':
    module.exports = require('./config/webpack.prod')({env: 'stage'});
    break;
  case 'qa':
    module.exports = require('./config/webpack.prod')({env: 'qa'});
    break;
  case 'publicdev':
  default:
    module.exports = require('./config/webpack.dev')({env: 'publicdev'});
}
