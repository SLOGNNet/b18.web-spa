const helpers = require('../helpers');

config = {
  base: {
    title: 'Bridge 18',
    port: 3000,
    host: '',
    port: '',
    baseUrl: '/spa/',
    hmr: false,
    socketIoHost: ''
  },
  development: {
    host: 'localhost',
    port: 3000,
    baseUrl: '/',
    hmr: helpers.hasProcessFlag('hot'),
    socketIoHost: 'http://localhost:5000',
    apiUrl: 'https://dev.bridge18.com/v1/api/expedition/',
    authUrl: 'https://dev.bridge18.com/api/'
  },
  publicdev: {
    socketIoHost: 'https://dev.bridge18.com',
    apiUrl: 'https://dev.bridge18.com/v1/api/expedition/',
    authUrl: 'https://dev.bridge18.com/api/'
  },
  test: {

  },
  qa: {
    socketIoHost: 'https://qa.bridge18.com'
  },
  stage: {
    socketIoHost: 'https://stage.bridge18.com'
  },
  production: {
  }
};

module.exports = {
  getConfig(env) {
    return Object.assign({}, config.base, config[env]);
  }
}
