/**
 * Represents an event.
 * @external Event
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event Event on MDN}
 */

/**
 * @function external:Event#constructor
 * @param {string} type String representing the name of the event.
 * @param {object} [options]
 * @param {boolean} [options.bubbles=false] A boolean indicating whether the event bubbles.
 * @param {boolean} [options.cancelable=false] A boolean indicating whether the event can be cancelled.
 * @param {boolean} [options.composed=false] A boolean indicating whether the event will trigger listeners outside of a shadow root.
 * @return {external:Event}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/Event Event constructor on MDN}
 */

/**
 * Tells that if the event does not get explicitly handled, its default action should not be taken as it normally would be. The event continues to propagate as usual, unless one of its event listeners calls {@link external:Event#stopPropagation} or {@link external:Event#stopImmediatePropagation}, either of which terminates propagation at once.
 * @function external:Event#preventDefault
 * @return {undefined}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault Event#preventDefault on MDN}
 */

/**
 * Prevents further propagation of the current event in the capturing and bubbling phases.
 * @function external:Event#stopPropagation
 * @return {undefined}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation Event#stopPropagation on MDN}
 */

/**
 * Prevents other listeners of the same event from being called. If several listeners are attached to the same element for the same event type, they are called in the order in which they were added. If invoked during one such call, no remaining listeners will be called.
 * @function external:Event#stopImmediatePropagation
 * @return {undefined}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation Event#stopImmediatePropagation on MDN}
 */
