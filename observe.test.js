'use strict';
const assert = require('assert');
const observe = require('./observe');

describe('xobject-observe', () => {

  it('should crash when no methods were specified', (f) => {
    observe.config.METHODS = [];
    try{
      observe({}, () => {});
    }catch(err){
      f();
    }
  });

  const backend = [{
    describe: 'with ES6 proxy observation',
    beforeEach: () => {
      observe.config.METHODS = ['es6proxy'];
    },
    afterEach: (obj) => {
      observe.stop(obj);
    },
    testEnd: (f) => f()
  }, {
    describe: 'with shallow dirty-checking observation',
    beforeEach: () => {
      observe.config.METHODS = ['dirtyChecking'];
      observe.config.DIRTYCHECK_DELAY = 100;
    },
    afterEach: (obj) => {
      observe.stop(obj);
    },
    testEnd: (f) => setTimeout(f) // be sure the dirty checking does not call again a listener
  }].forEach(backend => {

    describe(backend.describe, () => {
      describe('with a single level object', () => {
        let obj;

        beforeEach(() => backend.beforeEach());
        afterEach(() => backend.afterEach(obj));

        it('should emit en event when a property is added', (f) => {
          obj = observe({}, (prop, oldValue, newValue) => {
            assert(prop === 'a', `prop === 'a'`);
            assert(oldValue === undefined, `oldValue === undefined`);
            assert(newValue === 1, `newValue === 1`);
            backend.testEnd(f);
          });

          setTimeout(() => { // make it async
            obj.a = 1; // log: "a (undefined -> 1)"
          }, 100);
        });

        it('should emit en event when a property is changed', (f) => {
          obj = observe({
            a: 1
          }, (prop, oldValue, newValue) => {
            assert(prop === 'a', `prop === 'a'`);
            assert(oldValue === 1, `oldValue === 1`);
            assert(newValue === 2, `newValue === 2`);
            backend.testEnd(f);
          });

          setTimeout(() => { // make it async
            obj.a = 2; // log: "a (1 -> 2)"
          }, 100);
        });

        it('should emit en event when a property is removed', (f) => {
          obj = observe({
            a: 2
          }, (prop, oldValue, newValue) => {
            assert(prop === 'a', `prop === 'a'`);
            assert(oldValue === 2, `oldValue === 2`);
            assert(newValue === undefined, `newValue === undefined`);
            backend.testEnd(f);
          });

          setTimeout(() => { // make it async
            delete obj.a; // log: "a (2 -> undefined)"
          }, 100);

        });
      });
    });
  });
});
