'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var timeOrigin = Date.now();
/**
 * Creates a new event.
 * @implements external:Event
 * @inheritparams external:Event#constructor
 * @param {object} [options.target] Event target.
 * @param {object} [options....data] Extra event attributes.
 */

var Event =
/*#__PURE__*/
function () {
  function Event(type) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$bubbles = _ref.bubbles,
        bubbles = _ref$bubbles === void 0 ? false : _ref$bubbles,
        _ref$cancelable = _ref.cancelable,
        cancelable = _ref$cancelable === void 0 ? false : _ref$cancelable,
        _ref$composed = _ref.composed,
        composed = _ref$composed === void 0 ? false : _ref$composed,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        data = _objectWithoutProperties(_ref, ["bubbles", "cancelable", "composed", "target"]);

    _classCallCheck(this, Event);

    _defineProperty(this, "timeStamp", Date.now() - timeOrigin);

    _defineProperty(this, "defaultPrevented", false);

    _defineProperty(this, "cancelBubble", false);

    _defineProperty(this, "returnValue", true);

    _defineProperty(this, "isTrusted", true);

    _defineProperty(this, "eventPhase", 0);

    _defineProperty(this, "srcElement", null);

    _defineProperty(this, "stopped", false);

    Object.assign(this, data);
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
    this.composed = composed;
    this.target = target;
    this.currentTarget = target;
  }

  _createClass(Event, [{
    key: "preventDefault",

    /**
     * @return {undefined}
     */
    value: function preventDefault() {
      if (this.cancelable) this.defaultPrevented = true;
    }
    /**
     * @return {undefined}
     */

  }, {
    key: "stopPropagation",
    value: function stopPropagation() {
      this.cancelBubble = true;
    }
    /**
     * @return {undefined}
     */

  }, {
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this.stopped = true;
    }
  }]);

  return Event;
}();

/**
 * Creates an event emitter.
 * @implements external:EventTarget
 * @param {object} [target=this] Events emitted from the emitter will use the given object as their target.
 */

var Emitter =
/*#__PURE__*/
function () {
  function Emitter(target) {
    var _this = this;

    _classCallCheck(this, Emitter);

    _defineProperty(this, "listeners", {});

    _defineProperty(this, "synced", new Map());

    _defineProperty(this, "delegate", function (event) {
      return _this.dispatchEvent(event, event.target);
    });

    _defineProperty(this, "mixin", Object.getOwnPropertyDescriptors({
      addEventListener: this.addEventListener.bind(this),
      removeEventListener: this.removeEventListener.bind(this),
      dispatchEvent: this.dispatchEvent.bind(this),
      on: this.on.bind(this),
      off: this.off.bind(this),
      once: this.once.bind(this),
      emit: this.emit.bind(this),
      sync: this.sync.bind(this),
      unsync: this.unsync.bind(this)
    }));

    /**
     * Object used as the target of emitted events, depends on the `target` constructor parameter.
     * @type {Emitter|object}
     * @default this
     */
    this.target = target || this;
  }
  /**
   * Creates a listener object from options and `function` or {@link external:EventEmitter}.
   * @param {object|boolean} [options|useCapture]
   * @param {function|external:EventListener} listener
   * @return {object}
   * @ignore
   */


  _createClass(Emitter, [{
    key: "addEventListener",

    /**
     * @inheritparams external:EventTarget#addEventListener
     * @return {undefined}
     */
    value: function addEventListener(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!(type in this.listeners)) this.listeners[type] = [];
      this.listeners[type].push(this.constructor.listener(options, listener));
    }
    /**
     * @inheritparams external:EventTarget#removeEventListener
     * @return {undefined}
     */

  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!(type in this.listeners)) return;
      listener = this.constructor.listener(options, listener);
      var index = this.listeners[type].findIndex(function (_ref) {
        var subject = _ref.subject,
            capture = _ref.capture;
        return subject === listener.subject && capture === listener.capture;
      });
      if (index !== -1) this.listeners[type].splice(index, 1);
      if (this.listeners[type].length === 0) delete this.listeners[type];
    }
    /**
     * @inheritparams external:EventTarget#dispatchEvent
     * @return {boolean}
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var _this2 = this;

      var synced = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (event.type in this.listeners) {
        var once = [];
        this.listeners[event.type].some(function (listener) {
          if (listener.once) once.push(listener);
          if (listener.subject.handleEvent) listener.subject.handleEvent(event);else listener.subject.call(_this2, event);
          return event.stopped;
        });
        once.forEach(function (_ref2) {
          var subject = _ref2.subject,
              options = _objectWithoutProperties(_ref2, ["subject"]);

          _this2.removeEventListener(event.type, subject, options);
        });
      }

      if (synced && this.synced.has(synced)) {
        var listeners = this.synced.get(synced);

        if (event.type in listeners && listeners[event.type].once) {
          delete listeners[event.type];
        }
      }

      return !event.defaultPrevented;
    }
    /**
     * Behaves the same as {@link Emitter#addEventListener} except it's chainable and its first parameter accepts multiple types separated with spaces.
     * @inheritparams Emitter#addEventListener-1
     * @param {string} type Event type(s) to listen to, separated with spaces.
     * @return {Emitter|object} {@link Emitter#target}
     * @example
     * emitter.on('load change', () => console.log('loaded or changed'))
     */

  }, {
    key: "on",
    value: function on(type, listener) {
      var _this3 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.constructor.types(type).forEach(function (type) {
        _this3.addEventListener(type, listener, options);
      });
      return this.target;
    }
    /**
     * Behaves the same as {@link Emitter#removeEventListener} except it's chainable and its first parameter accepts multiple types separated with spaces.
     * @inheritparams Emitter#removeEventListener-1
     * @param {string} type Event type(s) to stop listening to, separated with spaces.
     * @return {Emitter|object} {@link Emitter#target}
     * @example
     * const listener = () => console.log('An event has been emitted')
     *
     * emitter
     *   .on('load change', listener)
     *   .off('load')
     *
     * // Now the listener will be called only when a 'change' event is emitted.
     */

  }, {
    key: "off",
    value: function off(type, listener) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.constructor.types(type).forEach(function (type) {
        _this4.removeEventListener(type, listener, options);
      });
      return this.target;
    }
    /**
     * Shortcut for `{@link Emitter#on}(type, listener, {...options, once: true})`.
     * @inheritparams Emitter#on
     * @param {boolean} [options.once=true] This options is ignored and always overwritten with `true`.
     * @return {Emitter|object} {@link Emitter#target}
     * @example
     * emitter.once('load', () => 'Loaded for the first time')
     *
     * // The listener will be called as soon as a 'load' event is emitted, then it will stop listening.
     */

  }, {
    key: "once",
    value: function once(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.on(type, listener, _objectSpread({}, this.constructor.listener(options), {
        once: true
      }));
    }
    /**
     * Emit an {@link Event} with the given type and data. {@link Event#target} is equal to {@link Emitter#target}.
     * @inheritparams Event
     * @return {Emitter|object} {@link Emitter#target}
     * @example
     * emitter.emit('load')
     *
     * // A 'load' event was just emitted.
     */

  }, {
    key: "emit",
    value: function emit(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var event = new Event(type, data);
      event.target = event.currentTarget = this.target;
      this.dispatchEvent(event);
      return this.target;
    }
    /**
     * Synchronizes an {@link external:EventTarget} (which can be an {@link Emitter}) with the emitter so it will emit events when the given target emit events of the given types.
     * @param {string} type Event type(s) to synchronize, separated with spaces.
     * @param {external:EventTarget} target The target to synchronize with.
     * @param {object|boolean} [options|useCapture=false] Passed to {@link Emitter#addEventListener}.
     * @return {Emitter|object} {@link Emitter#target}
     * @example
     * emitter.sync('click mousemove', document.body)
     *
     * // Now, when a click or mousemove event is dispatched from document.body, it will also be dispatched by the emitter.
     */

  }, {
    key: "sync",
    value: function sync(type, target) {
      var _this5 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var types = this.constructor.types(type);
      console.log(types);

      if (types.length) {
        if (!this.synced.has(target)) this.synced.set(target, {});
        var listeners = this.synced.get(target);
        var listener = this.constructor.listener(options);
        types.forEach(function (type) {
          if (type in listeners) {
            target.removeEventListener(type, _this5.delegate, listeners[type]);
          }

          target.addEventListener(type, _this5.delegate, options);
          listeners[type] = listener;
        });
      }

      return this.target;
    }
    /**
     * Unsynchronizes an {@link external:EventTarget} (which can be an {@link Emitter}) with the emitter so it will stop emitting events when the given target emit events of the given types.
     * @param {string} type Event type(s) to unsynchronize, separated with spaces.
     * @param {external:EventTarget} target The target to unsynchronize.
     * @param {object|boolean} [options|useCapture=false] Passed to {@link Emitter#addEventListener}.
     * @return {Emitter|object} {@link Emitter#target}
     * @example
     * emitter
     *   .sync('click mousemove', document.body)
     *   .unsync('click', document.body)
     *
     * // Now, only the mousemove event is synced with document.body.
     */

  }, {
    key: "unsync",
    value: function unsync(type, target) {
      var _this6 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.synced.has(target)) {
        var listeners = this.synced.get(target);
        var listener = this.constructor.listener(options);
        this.constructor.types(type).forEach(function (type) {
          if (type in listeners && listeners[type].capture === listener.capture) {
            target.removeEventListener(type, _this6.delegate, options);
            delete listeners[type];
          }
        });
      }

      return this.target;
    }
    /**
     * Mix emitter into the given object so the following methods become accessible from `subject`:
     * - {@link Emitter#addEventListener addEventListener}
     * - {@link Emitter#removeEventListener removeEventListener}
     * - {@link Emitter#dispatchEvent dispatchEvent}
     * - {@link Emitter#on on} (chainable)
     * - {@link Emitter#off off} (chainable)
     * - {@link Emitter#once once} (chainable)
     * - {@link Emitter#emit emit} (chainable)
     * - {@link Emitter#sync sync} (chainable)
     * - {@link Emitter#unsync unsync} (chainable)
     * @param {object} subject The object to mix.
     * @return {object} `subject`
     */

  }, {
    key: "mix",
    value: function mix(subject) {
      return Object.defineProperties(subject, this.mixin);
    }
  }], [{
    key: "listener",
    value: function listener(options) {
      var _listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (options === null || _typeof(options) !== 'object') {
        options = {
          capture: !!options
        };
      }

      var object = {
        once: options.once || false,
        passive: options.passive || false,
        capture: options.capture || false
      };
      if (_listener) object.subject = _listener;
      return object;
    }
    /**
     * Extracts event types from a string.
     * @param  {string} types String of event types separated by spaces.
     * @return {string[]} Array of event types.
     * @ignore
     */

  }, {
    key: "types",
    value: function types(_types) {
      return _types.trim().replace(/\s+/, ' ').split(' ').filter(function (type, index, types) {
        return types.indexOf(type) === index;
      });
    }
    /**
     * Creates a new {@link Emitter} with the given object as {@link Emitter#target target} then call {@link Emitter#mix} with `subject`.
     * @param {object} subject The object to mix.
     * @return {object} `subject`
     * @example
     * class Loader {
     *   constructor() {
     *     Emitter.mix(this)
     *   }
     *
     *   load() {
     *     this.emit('load')
     *   }
     * }
     *
     * const loader = new Loader()
     * loader.on('load', () => console.log('Loaded'))
     * loader.load()
     *
     * // The console will print 'Loaded'.
     */

  }, {
    key: "mix",
    value: function mix(subject) {
      return new this(subject).mix(subject);
    }
  }]);

  return Emitter;
}();

module.exports = Emitter;
