import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

// const DefaultEndpont = 'https://eos-studio.api.dfuse.dev';
const DefaultEndpont = 'http://localhost:8888';

class EosjsClient {
  constructor(privateKey, endpoint = DefaultEndpont) {
    this.privateKey = privateKey;
    this.endpoint = endpoint;
  }

  set privateKey(value) {
    if (!value) {
      return;
    }
    try {
      this.signatureProvider = new JsSignatureProvider([value]);
      this.updateApi();
    } catch (error) {
      // console.log(error);
    }
  }

  set endpoint(value) {
    if (!value) {
      return;
    }
    this.rpc = new JsonRpc(value);
    this.updateApi();
  }

  updateApi() {
    if (!this.rpc || !this.signatureProvider) {
      this.api = undefined;
      return;
    }
    this.api = new Api({
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
    });
  }

  transact(...args) {
    if (!this.api) {
      throw new Error('Private key or Endpoint is not set properly.');
    }
    return this.api.transact(...args);
  }

  getTableRows(...args) {
    if (!this.rpc) {
      return new Error('Endpoint not set.');
    }
    return this.rpc.get_table_rows(...args);
  }

  static isPrivateKeyValid(value) {
    try {
      new JsSignatureProvider([value]); // eslint-disable-line
      return true;
    } catch (error) {
      return false;
    }
  }

  isReady() {
    return !!this.signatureProvider;
  }

  reset() {
    this.signatureProvider = undefined;
    this.api = undefined;
    this.rpc = undefined;
    this.privateKey = undefined;
    this.endpoint = DefaultEndpont;
  }
}

export default new EosjsClient();
