import Event from '~/event'

test('prevents default and evaluates cancelable', () => {
  let event = new Event()
  expect(event.defaultPrevented).toStrictEqual(false)
  event.preventDefault()
  expect(event.defaultPrevented).toStrictEqual(false)

  event = new Event('foo', {cancelable: false})
  expect(event.defaultPrevented).toStrictEqual(false)
  event.preventDefault()
  expect(event.defaultPrevented).toStrictEqual(false)

  event = new Event('foo', {cancelable: true})
  expect(event.defaultPrevented).toStrictEqual(false)
  event.preventDefault()
  expect(event.defaultPrevented).toStrictEqual(true)
})

test('stops propagation', () => {
  const event = new Event()
  expect(event.cancelBubble).toStrictEqual(false)
  event.stopPropagation()
  expect(event.cancelBubble).toStrictEqual(true)
})

test('stops immediate propagation', () => {
  const event = new Event()
  expect(event.stopped).toStrictEqual(false)
  event.stopImmediatePropagation()
  expect(event.stopped).toStrictEqual(true)
})
