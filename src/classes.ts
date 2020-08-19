import * as github from '@actions/github'
import * as core from '@actions/core'

class Global {
  protected client: any

  /**
   * Parse the settings from inputs
   * @param inputdata
   */
  async parseSettings (inputdata: inputdata): Promise<[]> {
    if (inputdata.token) {
      this.client = github.getOctokit(inputdata.token)
    } else {
      throw new Error('No token provided')
    }
    return new Promise(async resolve => {
      let settings
      try {
        if (inputdata.settings && typeof inputdata.settings == 'string') {
          /**
           * Checks to see if the settings data is valid and converts to json
           */
          settings = JSON.parse(inputdata.settings)
          resolve(settings)
        } else if (typeof inputdata.file == 'string') {
          /**
           * Checks to see if the settings file is valid
           */
          settings = JSON.parse(
            await this.fetchContent({
              path: inputdata.file,
              owner: inputdata.owner,
              repo: inputdata.repo
            })
          )
          resolve(settings)
        }
      } catch (_) {
        throw new Error(_)
      }
    })
  }

  async fetchContent (context: repoContext): Promise<string> {
    const response: any = await this.client.repos.getContent({
      owner: context.owner || github.context.repo.owner,
      repo: context.repo || github.context.repo.repo,
      path: context.path
    })
    return Buffer.from(response.data.content, response.data.encoding).toString()
  }
}

// {
//   owner: 'Videndum',
//   repo: 'manage-github-secrets',
//   path: path
// }
class Outputs {
  /**
   * Outputs data as action output
   * @param name Name of the output
   * @param data Data to output
   */
  async output (name: string, data: any): Promise<string> {
    return new Promise(resolve => {
      if (!data.file || !data.mode || !data.settings) {
        throw new Error('data not formated correctly')
      }
    })
  }
}

export const global = new Global()
export const output = new Outputs()

export default {
  global: global,
  output: output
}

type inputdata = {
  settings?: {} | string
  file?: string
  mode?: string
  token?: string
  owner?: string
  repo?: string
}

type repoContext = {
  owner?: string
  repo?: string
  path: string
}
