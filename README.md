# xobject-observe

[![Build Status](https://img.shields.io/circleci/project/FGRibreau/xobject-observe.svg)](https://circleci.com/gh/FGRibreau/xobject-observe/) [![Deps](	https://img.shields.io/david/FGRibreau/xobject-observe.svg)](https://david-dm.org/FGRibreau/xobject-observe) [![NPM version](https://img.shields.io/npm/v/xobject-observe.svg)](http://badge.fury.io/js/xobject-observe) [![Downloads](http://img.shields.io/npm/dm/xobject-observe.svg)](https://www.npmjs.com/package/xobject-observe) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)


[![Selenium Browser Matrix](https://saucelabs.com/browser-matrix/xobject-observe.svg)](https://saucelabs.com/u/xobject-observe)

> A cross-browser object property observer uses ES6 proxy underneath and with fallback on dirty-checking.


# NPM

```
npm i xobject-observe -S
```

# Browser (for non compatible npm environment)

Include `dist/observe.browser.js` into your page and use `xObjectObserve()` function.

# Usage


```javascript
const observe = require('xobject-observe');

// create an empty object and observe it
const obj = observe({}, console.log.bind(console, '%s (%s -> %s)'))

obj.a = 1; // log: "a (undefined -> 1)" (adding)
obj.a = 2;// log: "a (1 -> 2)" (changing)
obj.b = {c:1}; // log: "b (undefined -> {c:1})" (removing)
```

# [Changelog](/CHANGELOG.md)

# Todo:

- [ ] IE9 support
- [ ] IE8 support
- [ ] (bonus) Opera support
