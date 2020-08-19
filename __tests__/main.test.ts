import * as classes from '../src/classes'
import * as settings from '../.github/allconfigs.json'
import * as config from './config.json'

test('throws invalid data', async () => {
  const input = 10
  await expect(classes.output.output('test', input)).rejects.toThrow(
    'data not formated correctly'
  )
})
test('string settings input', async () => {
  await expect(
    classes.global.parseSettings({
      token: config.token,
      settings: settings
    })
  )
})
test('file settings input', async () => {
  const input = '.github/allconfigs.json'
  await console.log(
    await classes.global.parseSettings({
      token: config.token,
      file: input,
      owner: 'Videndum',
      repo: 'manage-github-secrets'
    })
  )
})
test('blank settings input', async () => {
  const input = ''
  await expect(
    classes.global.parseSettings({
      token: config.token,
      settings: input
    })
  )
})
