'use strict';
const isDefined = require('./helpers/isDefined');
module.exports = (config, watched) => {
  return {
    isCompatible: () => isDefined('Proxy'),
    method: (object, listener) => {
      let stopped = false;

      // @todo use revocable proxy
      /**
       * ES6 Proxy support:
       *
       * Feature	Chrome	Firefox (Gecko)	Internet Explorer	Opera	Safari
       * Basic support	(Yes)	34 (34)	No support	No support	No support
       *
       * ES6 Revocable Proxy Support:
       * Feature	Chrome	Firefox (Gecko)	Internet Explorer	Opera	Safari
       * Basic support	(Yes)	34 (34)	No support	No support	No support
       */

      const proxiedObj = new Proxy(object, {
        deleteProperty: function(target, property) {
          if (!stopped) {
            listener(property, target[property], undefined, proxiedObj);
          }
          return true; // assignment succeeded
        },

        set: function(target, property, value, receiver) {
          if (!stopped) {
            listener(property, target[property], value, proxiedObj);
          }
          return true; // assignment succeeded
        }
      });

      watched[proxiedObj] = () => {
        // @todo add another method "es6revocableProxy" when support will be sufficient
        stopped = true;
      };

      return proxiedObj;
    }
  };
};
