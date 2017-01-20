const env = process.env.NODE_ENV || 'development';
const config = require('./env/config').getConfig(env);
config.env = env;
switch (process.env.NODE_ENV) {
  case 'production':
  case 'stage':
  case 'qa':
  case 'publicdev':
    module.exports = require('./webpack.prod')(config);
    break;
  case 'testing':
    module.exports = require('./webpack.test')(config);
    break;
  case 'development':
  default:
    module.exports = require('./webpack.dev')(config);
}
