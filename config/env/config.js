const helpers = require('../helpers');

config = {
  base: {
    title: 'Bridge18',
    port: '3000',
    host: '',
    port: '',
    baseUrl: '/spa/',
    hmr: false,
    socketIoHost: ''
  },
  development: {
    host: 'localhost',
    port: '3000',
    baseUrl: '/',
    hmr: helpers.hasProcessFlag('hot'),
    socketIoHost: 'http://localhost:5000'
  },
  publicdev: {
    socketIoHost: 'https://dev.bridge18.com/notifications'
  },
  testing: {

  },
  qa: {
    socketIoHost: 'https://qa.bridge18.com/notifications'
  },
  stage: {
    socketIoHost: 'https://stage.bridge18.com/notifications'
  },
  production: {
  }
};

module.exports = {
  getConfig(env) {
    return Object.assign({}, config.base, config[env]);
  }
}
