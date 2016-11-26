# xobject-observe

[![Build Status](https://img.shields.io/circleci/project/FGRibreau/xobject-observe.svg)](https://circleci.com/gh/FGRibreau/xobject-observe/) [![Coverage Status](https://img.shields.io/coveralls/FGRibreau/xobject-observe/master.svg)](https://coveralls.io/github/FGRibreau/xobject-observe?branch=master) [![Deps](	https://img.shields.io/david/FGRibreau/xobject-observe.svg)](https://david-dm.org/FGRibreau/xobject-observe) [![NPM version](https://img.shields.io/npm/v/xobject-observe.svg)](http://badge.fury.io/js/xobject-observe) [![Downloads](http://img.shields.io/npm/dm/xobject-observe.svg)](https://www.npmjs.com/package/xobject-observe) 

[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/francois-guillaume-ribreau?utm_source=github&utm_medium=button&utm_term=francois-guillaume-ribreau&utm_campaign=github)  [![available-for-advisory](https://img.shields.io/badge/available%20for%20consulting%20advisory-yes-ff69b4.svg?)](http://bit.ly/2c7uFJq) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg) [![Twitter Follow](https://img.shields.io/twitter/follow/fgribreau.svg?style=flat)](https://twitter.com/FGRibreau)


[![Selenium Browser Matrix](https://saucelabs.com/browser-matrix/xobject-observe.svg)](https://saucelabs.com/u/xobject-observe)

> A cross-browser object property observer uses ES6 proxy underneath and with fallback on dirty-checking.


### NPM

```
npm i xobject-observe -S
```

### Browser (for non compatible npm environment)

Include `dist/observe.browser.js` into your page and use `xObjectObserve()` function.

# Features

* Uses ES6 proxy and fallback on dirty-checking for old browsers
* Extensible and configurable detection backends
* Complete life-cycle management (`observe()` and `observe.stop()`)
* Automated **cross-browser** support through [SauceLabs](https://saucelabs.com/u/xobject-observe) (IE 10+, Chrome 33+, Firefox 33+, Safari 5+)
* [100%](https://coveralls.io/github/FGRibreau/xobject-observe?branch=master) **code coverage**
* [Available build](/dist) for non-commonjs environment

# Usage


```javascript
const observe = require('xobject-observe');

// create an empty object and observe it
const obj = observe({}, (property, oldValue, newValue, obj) => {
  console.log('%s (%s -> %s)', property, oldValue, newValue);
})

obj.a = 1; // log: "a (undefined -> 1)" (adding)
obj.a = 2;// log: "a (1 -> 2)" (changing)
obj.b = {c:1}; // log: "b (undefined -> {c:1})" (removing)

observe.stop(obj); // stop observing
```

# Currently supported detection backends

- *[es6proxy](/methods/es6proxy.js)*: (**fastest way in JS**) leverage ES6 Proxy to detect changes made on an object. No need to configure anything.
- *[dirtyChecking](/methods/dirtyChecking.js)*: (**slow but works everywhere**) regulary check if properties of the observed object between the last check (shallow object clone) and now. The comparison is done through a strict equality thus changes on nested objects are not supported. The check interval (in ms) is configurable through `observe.config.DIRTYCHECK_DELAY = 1000`.

Other backends can easily be setted at runtime as new attributes in `observe.methods`.


## How does it differ from Object.observe?

[Object.observe](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) is obsolete. It was deprecated in Chrome 49 and was entirely removed in Chrome 52. xobject-observe offers a cross-browser alternative to it with a slightly easier API.

xobject-observe leverage instead the [ES6 Proxy object API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) underneath for modern browsers and fallback on dirty-checking.

# [Changelog](/CHANGELOG.md)

# Todo:

- [ ] IE9 support
- [ ] IE8 support
- [ ] \(bonus\) Opera support


# Development

- `npm run update`: update dependencies
- `npm run changelog`: update changelog
- `npm run test-browser`: test browser
