'use strict';
module.exports = (config, watched) => {
  return {
    isCompatible: () => true, // dirty-checking is always available
    method: (object, listener) => {
      // fallback on dirty-checking
      let _nextTick;

      watched[object] = () => {
        clearTimeout(_nextTick);
      };

      function has(obj, key) {
        return obj.hasOwnProperty(key);

      }

      function shallowClone(obj) {
        const clone = {};
        for (var key in obj) { // for old browser support
          if (has(obj, key)) {
            clone[key] = obj[key];
          }
        }
        return clone;
      }

      /**
       * [checkChanges description]
       * @param  {[type]} oldObj   [description]
       * @param  {[type]} newObj   [description]
       * @param  {function} listener(property, oldValue, newValue)
       */
      function checkChanges(oldObj, newObj, listener) {
        // check for removal or change
        for (var key in oldObj) {

          if (!newObj.hasOwnProperty(key)) { // removed
            listener(key, oldObj[key], undefined, newObj);
            continue;
          }

          if (oldObj[key] !== newObj[key]) { // shallow comparison, may involve to deep object introspection in the future
            listener(key, oldObj[key], newObj[key], newObj);
          }
        }

        // check for new addition
        for (var key in newObj) {
          if (!oldObj.hasOwnProperty(key)) { // added
            listener(key, undefined, newObj[key], newObj);
          }
        }
      }

      /**
       * [tick description]
       * @param  {Number} delay
       * @param  {object} oldObj
       * @param  {object} newObj
       * @param  {function} listener
       */
      function tick(delay, oldObj, newObj, listener) {
        checkChanges(oldObj, newObj, listener);
        // @todo make it configurable
        _nextTick = setTimeout(tick, delay, delay, shallowClone(newObj), newObj, listener);
      }

      tick(config.DIRTYCHECK_DELAY, shallowClone(object), object, listener);

      return object;

    }
  };
};
