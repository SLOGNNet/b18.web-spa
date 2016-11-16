const helpers = require('../helpers');

config = {
    base: {
        title: 'Bridge18',
        port: '3000',
        host: '',
        port: '',
        baseUrl: '/',
        hmr: false,
        socketIoHost: 'https://localhost:5000'
    },
    development: {
        host: 'localhost',
        port: '3000',
        hmr: helpers.hasProcessFlag('hot')
    },
    testing: {
    },
    sandbox: {
      baseUrl: '/spa/'
   },
    production: {
      baseUrl: '/spa/'
    }
};

module.exports = {
    getConfig(env) {
        return Object.assign({}, config.base, config[env]);
    }
}
