/* eslint no-extend-native: ['error', {'exceptions': ['Function']}] */
/* eslint prefer-destructuring: 'off' */
/* eslint prefer-rest-params: 'off' */
/* eslint func-names: 'off' */
/* eslint no-restricted-properties: 'off' */
/* eslint no-underscore-dangle: 'off' */
/* eslint camelcase: 'off' */
/* eslint no-param-reassign: 'off' */
/* eslint no-plusplus: 'off' */
/* eslint no-shadow: 'off' */
/* eslint no-useless-escape: 'off' */
/* eslint no-restricted-syntax: 'off' */

/**
 * Add dataset support to elements
 * No globals, no overriding prototype with non-standard methods,
 *   handles CamelCase properly, attempts to use standard
 *   Object.defineProperty() (and Function bind()) methods,
 *   falls back to native implementation when existing
 * Inspired by http://code.eligrey.com/html5/dataset/
 *   (via https://github.com/adalgiso/html5-dataset/blob/master/html5-dataset.js )
 * Depends on Function.bind and Object.defineProperty/Object.getOwnPropertyDescriptor
 * All code below is Licensed under the X11/MIT License
 */

// Inspired by https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    const aArgs = Array.prototype.slice.call(arguments, 1);
    const fToBind = this;
    const FNOP = function () {};
    const fBound = function () {
      return fToBind.apply(
        this instanceof FNOP && oThis ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };

    FNOP.prototype = this.prototype;
    fBound.prototype = new FNOP();

    return fBound;
  };
}

/**
 * Xccessors Standard: Cross-browser ECMAScript 5 accessors
 * http://purl.eligrey.com/github/Xccessors
 *
 * 2010-06-21
 *
 * By Eli Grey, http://eligrey.com
 *
 * A shim that partially implements Object.defineProperty,
 * Object.getOwnPropertyDescriptor, and Object.defineProperties in browsers that have
 * legacy __(define|lookup)[GS]etter__ support.
 *
 * Licensed under the X11/MIT License
 *   See LICENSE.md
 */

// Removed a few JSLint options as Notepad++ JSLint validator complaining and
//   made comply with JSLint; also moved 'use strict' inside function
/* jslint white: true, undef: true, plusplus: true,
  bitwise: true, regexp: true, newcap: true, maxlen: 90 */

/*! @source http://purl.eligrey.com/github/Xccessors/blob/master/xccessors-standard.js */

(function () {
  const ObjectProto = Object.prototype;
  const defineGetter = ObjectProto.__defineGetter__;
  const defineSetter = ObjectProto.__defineSetter__;
  const lookupGetter = ObjectProto.__lookupGetter__;
  const lookupSetter = ObjectProto.__lookupSetter__;
  const hasOwnProp = ObjectProto.hasOwnProperty;

  if (defineGetter && defineSetter && lookupGetter && lookupSetter) {
    if (!Object.defineProperty) {
      Object.defineProperty = function (obj, prop, descriptor) {
        if (arguments.length < 3) { // all arguments required
          throw new TypeError('Arguments not optional');
        }

        prop += ''; // convert prop to string

        if (hasOwnProp.call(descriptor, 'value')) {
          if (!lookupGetter.call(obj, prop) && !lookupSetter.call(obj, prop)) {
            // data property defined and no pre-existing accessors
            obj[prop] = descriptor.value;
          }

          if ((hasOwnProp.call(descriptor, 'get')
            || hasOwnProp.call(descriptor, 'set'))) {
            // descriptor has a value prop but accessor already exists
            throw new TypeError('Cannot specify an accessor and a value');
          }
        }

        // can't switch off these features in ECMAScript 3
        // so throw a TypeError if any are false
        if (!(descriptor.writable && descriptor.enumerable
          && descriptor.configurable)) {
          throw new TypeError(
            'This implementation of Object.defineProperty does not support'
            + ' false for configurable, enumerable, or writable.'
          );
        }

        if (descriptor.get) {
          defineGetter.call(obj, prop, descriptor.get);
        }
        if (descriptor.set) {
          defineSetter.call(obj, prop, descriptor.set);
        }

        return obj;
      };
    }

    if (!Object.getOwnPropertyDescriptor) {
      Object.getOwnPropertyDescriptor = function (obj, prop) {
        if (arguments.length < 2) { // all arguments required
          throw new TypeError('Arguments not optional.');
        }

        prop += ''; // convert prop to string

        const descriptor = {
          configurable: true,
          enumerable: true,
          writable: true
        };


        const getter = lookupGetter.call(obj, prop);


        const setter = lookupSetter.call(obj, prop);

        if (!hasOwnProp.call(obj, prop)) {
          // property doesn't exist or is inherited
          return descriptor;
        }
        if (!getter && !setter) { // not an accessor so return prop
          descriptor.value = obj[prop];
          return descriptor;
        }

        // there is an accessor, remove descriptor.writable;
        // populate descriptor.get and descriptor.set (IE's behavior)
        delete descriptor.writable;
        descriptor.get = undefined;
        descriptor.set = undefined;

        if (getter) {
          descriptor.get = getter;
        }
        if (setter) {
          descriptor.set = setter;
        }

        return descriptor;
      };
    }

    if (!Object.defineProperties) {
      Object.defineProperties = function (obj, props) {
        let prop;
        for (prop in props) {
          if (hasOwnProp.call(props, prop)) {
            Object.defineProperty(obj, prop, props[prop]);
          }
        }
      };
    }
  }
}());

// Begin dataset code

if (!document.documentElement.dataset
  // FF is empty while IE gives empty object
  && (!Object.getOwnPropertyDescriptor(Element.prototype, 'dataset')
    || !Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get)
) {
  const propDescriptor = {
    enumerable: true,
    get() {
      let i;


      const that = this;


      let HTML5_DOMStringMap;


      let attrVal; let attrName; let propName;


      let attribute;


      const attributes = this.attributes;


      const attsLength = attributes.length;


      const toUpperCase = function (n0) {
        return n0.charAt(1).toUpperCase();
      };


      const getter = function () {
        return this;
      };


      const setter = function (attrName, value) {
        return (typeof value !== 'undefined')
          ? this.setAttribute(attrName, value)
          : this.removeAttribute(attrName);
      };
      try { // Simulate DOMStringMap w/accessor support
        // Test setting accessor on normal object
        ({}).__defineGetter__('test', () => {
        });
        HTML5_DOMStringMap = {};
      } catch (e1) { // Use a DOM object for IE8
        HTML5_DOMStringMap = document.createElement('div');
      }
      for (i = 0; i < attsLength; i++) {
        attribute = attributes[i];
        // Fix: This test really should allow any XML Name without
        //         colons (and non-uppercase for XHTML)
        if (attribute && attribute.name
          && (/^data-\w[\w\-]*$/).test(attribute.name)) {
          attrVal = attribute.value;
          attrName = attribute.name;
          // Change to CamelCase
          propName = attrName.substr(5).replace(/-./g, toUpperCase);
          try {
            Object.defineProperty(HTML5_DOMStringMap, propName, {
              enumerable: this.enumerable,
              get: getter.bind(attrVal || ''),
              set: setter.bind(that, attrName)
            });
          } catch (e2) { // if accessors are not working
            HTML5_DOMStringMap[propName] = attrVal;
          }
        }
      }
      return HTML5_DOMStringMap;
    }
  };
  try {
    // FF enumerates over element's dataset, but not
    //   Element.prototype.dataset; IE9 iterates over both
    Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
  } catch (e) {
    propDescriptor.enumerable = false; // IE8 does not allow setting to true
    Object.defineProperty(Element.prototype, 'dataset', propDescriptor);
  }
}
