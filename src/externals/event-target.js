/**
 * Interface implemented by objects that can receive events and may have listeners for them.
 * @external EventTarget
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget EventTarget on MDN}
 */

/**
 * @function external:EventTarget#constructor
 * @return {external:EventTarget}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget EventTarget constructor on MDN}
 */

/**
 * Sets up a function that will be called whenever the specified event is delivered to the target
 * @function external:EventTarget#addEventListener
 * @param {string} type A case-sensitive string representing the event type to listen for.
 * @param {EventListener|function} listener The object which receives a notification (an object that implements the {@link external:Event} interface) when an event of the specified type occurs.
 * @param {object|boolean} [options|useCapture=false]
 * - `options`: An options object that specifies characteristics about the event listener.
 * - `useCapture`: A boolean indicating whether events of this type will be dispatched to the registered `listener` before being dispatched to any {@link external:EventTarget} beneath it in the DOM tree. Events that are bubbling upward through the tree will not trigger a listener designated to use capture. Event bubbling and capturing are two ways of propagating events which occur in an element that is nested within another element, when both elements have registered a handle for that event. The event propagation mode determines the order in which elements receive the event.
 * @param {boolean} [options.capture=false] A boolean indicating that events of this type will be dispatched to the registered `listener` before being dispatched to any {@link external:EventTarget} beneath it in the DOM tree.
 * @param {boolean} [options.once=false] A boolean indicating that the `listener` should be invoked at most once after being added. If `true`, the listener would be automatically removed when invoked.
 * @param {boolean} [options.passive=false] A boolean which, if `true`, indicates that the function specified by `listener` will never call {@link external:Event#preventDefault}.
 * @return {undefined}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener EventTarget#addEventListener on MDN}
 */

/**
 * Removes from the {@link external:EventTarget} an event listener previously registered with {@link EventTarget#addEventListener}.
 * @function external:EventTarget#removeEventListener
 * @param {string} type
 * @param {EventListener|function} listener
 * @param {object|boolean} [options|useCapture=false]
 * - `options`: An options object that specifies characteristics about the event listener.
 * - `useCapture`: Specifies whether the `listener` to be removed is registered as a capturing listener or not. If a listener is registered twice, one with capture and one without, remove each one separately. Removal of a capturing listener does not affect a non-capturing version of the same listener, and vice versa.
 * @param {boolean} [options.capture=false] A boolean that indicates that events of this type will be dispatched to the registered `listener` before being dispatched to any {@link external:EventTarget} beneath it in the DOM tree.
 * @return {undefined}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener EventTarget#removeEventListener on MDN}
 */

/**
 * Dispatches an {@link external:Event} at the specified {@link external:EventTarget}, (synchronously) invoking the affected listeners in the appropriate order.
 * @function external:EventTarget#dispatchEvent
 * @param {external:Event} event The Event object to be dispatched.
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener EventTarget#removeEventListener on MDN}
 */
