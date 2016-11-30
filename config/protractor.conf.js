/**
 * @author: @AngularClass
 */

require('ts-node/register');
var helpers = require('./helpers');

var withJS = {
  'browserName': 'chrome',
  'chromeOptions': {
    'args': ['show-fps-counter=true']
  }
};

var withoutJS = {
  'browserName': 'phantomjs',
  'javascriptEnabled': true
};

exports.config = {
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    helpers.root('./src/e2e/**.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },

  onPrepare: function() {
    this.config.capabilities = browser.params.nojs ? withoutJS : withJS;
    this.config.directConnect = !browser.params.nojs;
    browser.ignoreSynchronization = true;
  }.bind(this),

  onComplete: function() {
    console.log('***** Protractor is done');
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *   
   *   'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
   */
   useAllAngular2AppRoots: true
};
