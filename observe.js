'use strict';
// require('babel-polyfill');
// https://gist.github.com/eligrey/384583

// global configuration
const config = {
  METHODS: ['es6proxy', 'dirtyChecking'],
  DIRTYCHECK_DELAY: 1000,
  OBSERVE_KEY: '__OBSERVED__'
};

function find(arr, predicate) { // cross-browser helper
  for (let i = 0, iM = arr.length; i < iM; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return null;
}

// (object, (prop, oldValue, newValue))
function observe(object, listener) {
  // find a compatible method
  const compatibleMethodName = find(config.METHODS, (methodName) => observe.methods[methodName].isCompatible());
  if (!compatibleMethodName) {
    throw new Error('No detection method compatible with your browser');
  }

  return observe.methods[compatibleMethodName].method(object, listener);
}

observe.methods = {
  es6proxy: require('./methods/es6proxy')(config),
  dirtyChecking: require('./methods/dirtyChecking')(config)
};

// expose global configuration
observe.config = config;

observe.stop = (obj) => {
  obj[config.OBSERVE_KEY]();
}

module.exports = observe;
