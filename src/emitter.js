import Event from '~/event'

/**
 * Creates an event emitter.
 * @implements external:EventTarget
 * @param {object} [target=this] Events emitted from the emitter will use the given object as their target.
 */
class Emitter {
  constructor(target) {
    /**
     * Object used as the target of emitted events, depends on the `target` constructor parameter.
     * @type {Emitter|object}
     * @default this
     */
    this.target = target || this
  }

  /**
   * Creates a listener object from options and `function` or {@link external:EventEmitter}.
   * @param {object|boolean} [options|useCapture]
   * @param {function|external:EventListener} listener
   * @return {object}
   * @ignore
   */
  static listener(options, listener = null) {
    if(options === null || typeof options !== 'object') {
      options = {capture: !!options}
    }

    const object = {
      once: options.once || false,
      passive: options.passive || false,
      capture: options.capture || false,
    }

    if(listener) object.subject = listener

    return object
  }

  /**
   * Extracts event types from a string.
   * @param  {string} types String of event types separated by spaces.
   * @return {string[]} Array of event types.
   * @ignore
   */
  static types(types) {
    return types
      .trim()
      .replace(/\s+/, ' ')
      .split(' ')
      .filter((type, index, types) => type && types.indexOf(type) === index)
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
  static mix(subject) {
    return new this(subject).mix(subject)
  }

  listeners = {}
  synced = new Map()
  delegate = event => this.dispatchEvent(event, event.target)
  mixin = Object.getOwnPropertyDescriptors({
    addEventListener: this.addEventListener.bind(this),
    removeEventListener: this.removeEventListener.bind(this),
    dispatchEvent: this.dispatchEvent.bind(this),
    on: this.on.bind(this),
    off: this.off.bind(this),
    once: this.once.bind(this),
    emit: this.emit.bind(this),
    sync: this.sync.bind(this),
    unsync: this.unsync.bind(this)
  })

  /**
   * @inheritparams external:EventTarget#addEventListener
   * @return {undefined}
   */
  addEventListener(type, listener, options = false) {
    if(!(type in this.listeners)) this.listeners[type] = []
    this.listeners[type].push(this.constructor.listener(options, listener))
  }

  /**
   * @inheritparams external:EventTarget#removeEventListener
   * @return {undefined}
   */
  removeEventListener(type, listener, options = false) {
    if(!(type in this.listeners)) return

    listener = this.constructor.listener(options, listener)
    const index = this.listeners[type].findIndex(({subject, capture}) => {
      return subject === listener.subject && capture === listener.capture
    })

    if(index !== -1) this.listeners[type].splice(index, 1)
    if(this.listeners[type].length === 0) delete this.listeners[type]
  }

  /**
   * @inheritparams external:EventTarget#dispatchEvent
   * @return {boolean}
   */
  dispatchEvent(event, synced = null) {
    if(event.type in this.listeners) {
      const once = []

      this.listeners[event.type].some(listener => {
        if(listener.once) once.push(listener)
        if(listener.subject.handleEvent) listener.subject.handleEvent(event)
        else listener.subject.call(this, event)
        return event.stopped
      })

      once.forEach(({subject, ...options}) => {
        this.removeEventListener(event.type, subject, options)
      })
    }

    if(synced && this.synced.has(synced)) {
      const listeners = this.synced.get(synced)
      if(event.type in listeners && listeners[event.type].once) {
        delete listeners[event.type]
      }
    }

    return !event.defaultPrevented
  }

  /**
   * Behaves the same as {@link Emitter#addEventListener} except it's chainable and its first parameter accepts multiple types separated with spaces.
   * @inheritparams Emitter#addEventListener-1
   * @param {string} type Event type(s) to listen to, separated with spaces.
   * @return {Emitter|object} {@link Emitter#target}
   * @example
   * emitter.on('load change', () => console.log('loaded or changed'))
   */
  on(type, listener, options = false) {
    this.constructor.types(type).forEach(type => {
      this.addEventListener(type, listener, options)
    })

    return this.target
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
  off(type, listener, options = false) {
    this.constructor.types(type).forEach(type => {
      this.removeEventListener(type, listener, options)
    })

    return this.target
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
  once(type, listener, options = false) {
    return this.on(type, listener, {
      ...this.constructor.listener(options),
      once: true
    })
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
  emit(type, data = {}) {
    const event = new Event(type, data)
    event.target = event.currentTarget = this.target
    this.dispatchEvent(event)
    return this.target
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
  sync(type, target, options = false) {
    const types = this.constructor.types(type)

    if(types.length) {
      if(!this.synced.has(target)) this.synced.set(target, {})
      const listeners = this.synced.get(target)
      const listener = this.constructor.listener(options)

      types.forEach(type => {
        if(type in listeners) {
          target.removeEventListener(type, this.delegate, listeners[type])
        }

        target.addEventListener(type, this.delegate, options)

        listeners[type] = listener
      })
    }

    return this.target
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
  unsync(type, target, options = false) {
    if(this.synced.has(target)) {
      const listeners = this.synced.get(target)
      const listener = this.constructor.listener(options)

      this.constructor.types(type).forEach(type => {
        if(type in listeners && listeners[type].capture === listener.capture) {
          target.removeEventListener(type, this.delegate, options)
          delete listeners[type]
        }
      })
    }

    return this.target
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
  mix(subject) {
    return Object.defineProperties(subject, this.mixin)
  }
}

export default Emitter
