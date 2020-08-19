import * as core from '@actions/core'
import { global } from './classes'
async function run (): Promise<void> {
  try {
    const inputdata = {
      mode: core.getInput('mode'),
      file: core.getInput('settingsjson'),
      settings: core.getInput('settings'),
      token: core.getInput('token')
    }
    core.debug(`mode is ${inputdata.mode}.`)
    core.debug(`file is ${inputdata.file}.`)
    core.debug(`settings are ${inputdata.settings}.`)
    const settings = await global.parseSettings(inputdata).catch(err => {
      core.error(err)
    })

    console.log(settings)

    switch (inputdata.mode) {
      case 'secret': {
        // secret.output()
      }
      case 'output': {
        // output.output()
      }
      case 'environment': {
        // environment.output()
      }
      default: {
        core.error(
          `Mode is unknown ('${inputdata.mode}') - Valid options: output, secret, environment`
        )
      }
    }
    // core.debug(new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
