import * as classes from '../src/classes'

test('throws invalid data', async () => {
  const input = 10
  await expect(classes.output.output('test', input)).rejects.toThrow(
    'data not formated correctly'
  )
})
test('string settings input', async () => {
  const input = '{"settings": {"lastCommit": ""}}'
  await expect(classes.global.parseSettings({ settings: input }))
})
test('blank settings input', async () => {
  const input = ''
  await expect(classes.global.parseSettings({ settings: input }))
})
