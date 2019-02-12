const timeOrigin = Date.now()

/**
 * Creates a new event.
 * @implements external:Event
 * @inheritparams external:Event#constructor
 * @param {object} [options.target] Event target.
 * @param {object} [options....data] Extra event attributes.
 */
class Event {
  constructor(type, {
    bubbles = false,
    cancelable = false,
    composed = false,
    target = null,
    ...data
  } = {}) {
    Object.assign(this, data)
    this.type = type
    this.bubbles = bubbles
    this.cancelable = cancelable
    this.composed = composed
    this.target = target
    this.currentTarget = target
  }

  timeStamp = Date.now() - timeOrigin
  defaultPrevented = false
  cancelBubble = false
  returnValue = true
  isTrusted = true
  eventPhase = 0
  srcElement = null
  stopped = false

  /**
   * @return {undefined}
   */
  preventDefault() {
    if(this.cancelable) this.defaultPrevented = true
  }

  /**
   * @return {undefined}
   */
  stopPropagation() {
    this.cancelBubble = true
  }

  /**
   * @return {undefined}
   */
  stopImmediatePropagation() {
    this.stopped = true
  }
}

export default Event
