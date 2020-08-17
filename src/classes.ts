import { isNumber, isString } from "util";
// import * as github from '@actions/github'

class Global {
  /**
   * Parse the settings from inputs
   * @param inputdata
   */
  async parseSettings(inputdata: inputdata): Promise<[]> {
    return new Promise((resolve) => {
      let settings;
      console.log(inputdata);
      if (isString(inputdata.settings)) {
        /**
         * Checks to see if the settings data is valid and converts to json
         */
        settings = JSON.parse(inputdata.settings);
        console.log(settings);
        resolve(settings);
      } else if (inputdata.file) {
        /**
         * Checks to see if the settings file is valid
         */
      } else {
        throw new Error(`Settings are invalid`);
      }
    });
  }
}

class Outputs {
  /**
   * Outputs data as action output
   * @param name Name of the output
   * @param data Data to output
   */
  async output(name: string, data: any): Promise<string> {
    return new Promise((resolve) => {
      if (!data.file || !data.mode || !data.settings) {
        throw new Error("data not formated correctly");
      }
    });
  }
}
class Environment {
  /**
   * Outputs data as Environment variable
   * @param name Name of the output
   * @param data Data to output
   */
  async output(name: string, data: any): Promise<string> {
    return new Promise((resolve) => {
      if (isNumber(data)) {
        throw new Error("data not a string");
      }
    });
  }
}
class Secrets {
  /**
   * Outputs data as Secret variable
   * @param name Name of the output
   * @param data Data to output
   */
  async output(name: string, data: any): Promise<string> {
    return new Promise((resolve) => {
      if (isNumber(data)) {
        throw new Error("data not a string");
      }
    });
  }
}

export const global = new Global();
export const output = new Outputs();
export const environment = new Environment();
export const secret = new Secrets();
export default {
  global: global,
  output: output,
  environment: environment,
  secret: secret,
};

type inputdata = {
  settings?: {};
  file?: string;
  mode?: string;
};
