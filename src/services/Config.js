import config from '../config.json';

class Config {
  constructor() {
    if (!config || !config.server || typeof config.server.port !== 'number' || typeof config.server.host !== 'string')
      throw new Error('Missing or wrong config.json!');
    this.json = config;
    this.server = {
      host: this.json.server.host,
      port: this.json.server.port,
      url: `${this.json.server.host}${this.json.server.port ? `:${this.json.server.port}` : ''}`,
      timeout: this.json.server.timeout,
    };
  }
}

const instance = new Config();
Object.freeze(instance);

export default instance;
