# xobject-observe

[![Build Status](https://img.shields.io/circleci/project/FGRibreau/xobject-observe.svg)](https://circleci.com/gh/FGRibreau/xobject-observe/) [![Deps](	https://img.shields.io/david/FGRibreau/xobject-observe.svg)](https://david-dm.org/FGRibreau/xobject-observe) [![NPM version](https://img.shields.io/npm/v/xobject-observe.svg)](http://badge.fury.io/js/xobject-observe) [![Downloads](http://img.shields.io/npm/dm/xobject-observe.svg)](https://www.npmjs.com/package/xobject-observe) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)


[![Selenium Browser Matrix](https://saucelabs.com/browser-matrix/xobject-observe.svg)](https://saucelabs.com/u/xobject-observe)

> A cross-browser object property observer uses ES6 proxy underneath and with fallback on dirty-checking.


### NPM

```
npm i xobject-observe -S
```

### Browser (for non compatible npm environment)

Include `dist/observe.browser.js` into your page and use `xObjectObserve()` function.

# Features

* Uses ES6 proxy and fallback on dirty-checking for older browser.
* Extensible and configurable detection backends
* Complete life-cycle management (`observe()` and `observe.stop()`)
* Cross-browser support (IE 10+, Chrome 33+, Firefox 33+, Safari 5+)

# Usage


```javascript
const observe = require('xobject-observe');

// create an empty object and observe it
const obj = observe({}, console.log.bind(console, '%s (%s -> %s)'))

obj.a = 1; // log: "a (undefined -> 1)" (adding)
obj.a = 2;// log: "a (1 -> 2)" (changing)
obj.b = {c:1}; // log: "b (undefined -> {c:1})" (removing)

observe.stop(obj); // stop observing
```

# Currently supported detection backends

- *[es6proxy](/methods/es6proxy.js)*: (**fastest way in JS**) leverage ES6 Proxy to detect changes made on an object. No need to configure anything.
- *[dirtyChecking](/methods/dirtyChecking.js)*: (**slow but works everywhere**) regulary check if properties of the observed object between the last check (shallow object clone) and now. The comparison is done through a strict equality thus changes on nested objects are not supported. The check interval (in ms) is configurable through `observe.config.DIRTYCHECK_DELAY = 1000`.

# [Changelog](/CHANGELOG.md)

# Todo:

- [ ] IE9 support
- [ ] IE8 support
- [ ] (bonus) Opera support
