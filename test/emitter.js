import Emitter from '~/emitter'

test('calls listeners when emiting events', () => {
  const listeners = [
    jest.fn(),
    jest.fn(),
    jest.fn(),
    jest.fn()
  ]

  const emitter = new Emitter()
    .on('foo', listeners[0])
    .on('foo', listeners[1])

  emitter.addEventListener('foo', listeners[2])
  emitter.addEventListener('foo', listeners[3])
  emitter.emit('foo')

  expect(listeners[0]).toBeCalledTimes(1)
  expect(listeners[1]).toBeCalledTimes(1)
  expect(listeners[2]).toBeCalledTimes(1)
  expect(listeners[3]).toBeCalledTimes(1)
})

test('does not call removed listener', () => {
  const listeners = [jest.fn(), jest.fn()]

  const emitter = new Emitter()
    .on('foo', listeners[0])
    .off('foo', listeners[0])

  emitter.addEventListener('foo', listeners[1])
  emitter.removeEventListener('foo', listeners[1])
  emitter.emit('foo')

  expect(listeners[0]).not.toBeCalled()
  expect(listeners[1]).not.toBeCalled()
})

test('evaluate target', () => {
  const object = {}
  expect(new Emitter(object).target).toStrictEqual(object)
})

test('evaluates options', () => {
  const emitter = new Emitter()

  expect(emitter.on('foo', null).listeners.foo[0])
    .toEqual({once: false, passive: false, capture: false})

  expect(emitter.on('foo', null, false).listeners.foo[1])
    .toEqual({once: false, passive: false, capture: false})

  expect(emitter.on('foo', null, true).listeners.foo[2])
    .toEqual({once: false, passive: false, capture: true})

  expect(emitter.on('foo', null, {capture: false}).listeners.foo[3])
    .toEqual({once: false, passive: false, capture: false})

  expect(emitter.on('foo', null, {once: true, passive: true, capture: true}).listeners.foo[4])
    .toEqual({once: true, passive: true, capture: true})
})

test('does not call listener when not emiting events', () => {
  const listener = jest.fn()

  new Emitter().on('foo', listener)

  expect(listener).not.toBeCalled()
})

test('calls listener for each given event types', () => {
  const listener = jest.fn()

  new Emitter()
    .on('foo bar', listener)
    .emit('foo')
    .emit('bar')

  expect(listener).toBeCalledTimes(2)
})

test('calls listener one time when registered with once', () => {
  const emitter = new Emitter()
  const other = new Emitter()
  let listener = jest.fn()

  emitter
    .once('foo', listener)
    .emit('foo')
    .emit('foo')

  expect(listener).toBeCalledTimes(1)

  listener = jest.fn()

  emitter
    .sync('foo', other, {once: true})
    .on('foo', listener)

  other
    .emit('foo')
    .emit('foo')

  expect(listener).toBeCalledTimes(1)
})

test('handles EventListener interface', () => {
  const listener = {handleEvent: jest.fn()}

  new Emitter()
    .on('foo', listener)
    .emit('foo')

  expect(listener.handleEvent).toBeCalled()
})

test('does not remove anything when trying to remove unknown listener', () => {
  const emitter = new Emitter()
    .on('foo', () => {})
    .off('foo', () => {})

  expect(emitter.listeners.foo.length).toStrictEqual(1)
})

test('does not remove or add anything when trying to remove unknown event', () => {
  const listener = () => {}
  const emitter = new Emitter()
    .on('foo', listener)
    .off('bar', listener)

  expect(emitter.listeners.foo.length).toStrictEqual(1)
  expect(emitter.listeners.bar).toStrictEqual(undefined)
})

test('does not remove anything if not same capture option', () => {
  const listener = () => {}
  const emitter = new Emitter()
    .on('foo', listener, true)
    .off('foo', listener, false)

  expect(emitter.listeners.foo.length).toStrictEqual(1)
})

test('mixes its methods', () => {
  let object = {}
  const emitter = new Emitter()
  emitter.mix(object)

  expect(object.addEventListener).toStrictEqual(emitter.mixin.addEventListener.value)
  expect(object.removeEventListener).toStrictEqual(emitter.mixin.removeEventListener.value)
  expect(object.dispatchEvent).toStrictEqual(emitter.mixin.dispatchEvent.value)
  expect(object.on).toStrictEqual(emitter.mixin.on.value)
  expect(object.off).toStrictEqual(emitter.mixin.off.value)
  expect(object.once).toStrictEqual(emitter.mixin.once.value)
  expect(object.emit).toStrictEqual(emitter.mixin.emit.value)
  expect(object.sync).toStrictEqual(emitter.mixin.sync.value)
  expect(object.unsync).toStrictEqual(emitter.mixin.unsync.value)

  object = Emitter.mix({})

  expect(object.addEventListener).toBeInstanceOf(Function)
  expect(object.removeEventListener).toBeInstanceOf(Function)
  expect(object.dispatchEvent).toBeInstanceOf(Function)
  expect(object.on).toBeInstanceOf(Function)
  expect(object.off).toBeInstanceOf(Function)
  expect(object.once).toBeInstanceOf(Function)
  expect(object.emit).toBeInstanceOf(Function)
  expect(object.sync).toBeInstanceOf(Function)
  expect(object.unsync).toBeInstanceOf(Function)
})

test('does stop immediately', () => {
  const listeners = [jest.fn(), jest.fn()]
  new Emitter()
    .on('foo', listeners[0])
    .on('foo', event => event.stopImmediatePropagation())
    .on('foo', listeners[1])
    .emit('foo')

  expect(listeners[0]).toBeCalled()
  expect(listeners[1]).not.toBeCalled()
})

test('syncs with other event targets', () => {
  const emitter = new Emitter()
  const other = new Emitter()
  const fooListener = jest.fn()
  const barListener = jest.fn()

  emitter
    .sync('foo bar', other)
    .on('foo', fooListener)
    .on('bar', barListener)

  other
    .emit('foo')
    .emit('bar')

  expect(fooListener).toBeCalled()
  expect(barListener).toBeCalled()
})

test('unsyncs from other event targets', () => {
  const emitter = new Emitter()
  const other = new Emitter()
  const fooListener = jest.fn()
  const barListener = jest.fn()

  emitter
    .sync('foo bar', other)
    .on('foo', fooListener)
    .on('bar', barListener)
    .unsync('foo bar', other)

  other
    .emit('foo')
    .emit('bar')

  expect(fooListener).not.toBeCalled()
  expect(barListener).not.toBeCalled()
})

test('syncs without duplicating when synced multiple times with the same event target', () => {
  const emitter = new Emitter()
  const other = new Emitter()
  const listener = jest.fn()

  emitter
    .sync('foo', other)
    .sync('foo', other)
    .on('foo', listener)

  other
    .emit('foo')

  expect(listener).toBeCalledTimes(1)
})

test('does not sync anything if no type given', () => {
  expect(new Emitter().sync('', new Emitter()).synced.size).toStrictEqual(0)
})

test('does not unsync anything when unknown event target given', () => {
  const emitter = new Emitter()
    .sync('foo', new Emitter())
    .unsync('foo', new Emitter())

  expect(emitter.synced.size).toStrictEqual(1)
})

test('does not unsync if not same capture option', () => {
  const other = new Emitter()
  const emitter = new Emitter()
    .sync('foo', other, true)
    .unsync('foo', other, false)

  expect(emitter.synced.size).toStrictEqual(1)
})
