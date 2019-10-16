import CryptoJS from 'crypto-js';
import eos from './eos';

class AuthManager {
  constructor(account = localStorage.getItem('account')) {
    this.eos = eos;
    this.account = account || '';
    this.fetchAuth();
  }

  async login(account, password, privateKey) {
    if (this.isLoginBefore()) {
      this.eos.privateKey = AuthManager.decrypt(this.ciphertext, password);
    } else {
      this.eos.privateKey = privateKey;
      this.ciphertext = AuthManager.encrypt(privateKey, password);
    }

    try {
      const result = await this.eos.transact({
        actions: [{
          account,
          name: 'login',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {},
        }],
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      this.account = account;
      this.saveAuth();
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  logout() {
    this.eos.reset();
  }

  saveAuth() {
    localStorage.setItem('auth', JSON.stringify({
      account: this.account,
      ciphertext: this.ciphertext,
    }));
  }

  fetchAuth() {
    const storageAuthInfo = localStorage.getItem('auth');
    if (storageAuthInfo) {
      const auth = JSON.parse(storageAuthInfo);
      this.account = auth.account;
      this.ciphertext = auth.ciphertext;
    }
  }

  isLogin() {
    return this.eos.isReady();
  }

  isLoginBefore() {
    return !!this.account && !!this.ciphertext;
  }

  reset() {
    localStorage.removeItem('auth');
    this.account = '';
    this.ciphertext = '';
  }

  static encrypt(plaintext, password) {
    try {
      const ciphertext = CryptoJS.AES.encrypt(plaintext, password).toString();
      return ciphertext;
    } catch (error) {
      return '';
    }
  }

  static decrypt(ciphertext, password) {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, password);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      return plaintext;
    } catch (error) {
      return '';
    }
  }
}

export default new AuthManager();
