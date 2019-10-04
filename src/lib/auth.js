import eos from './eos';

class AuthManager {
  constructor() {
    this.eos = eos;
    this.username = 'eosblog';
  }
}

export default new AuthManager();
