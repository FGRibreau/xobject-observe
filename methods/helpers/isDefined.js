'use strict';
// helper
const isDefined = (function() {
  const global_ = typeof window === 'object' ? window : global;
  return (globalVar) => global_.hasOwnProperty(globalVar);
})();

module.exports = isDefined;
