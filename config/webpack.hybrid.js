const env = process.env.NODE_ENV || 'development';
const config = require('./env/config').getConfig(env);
config.env = env;
switch (process.env.NODE_ENV) {
  case 'development':
  default:
    module.exports = require('./webpack.hybrid.dev')(config);
}
