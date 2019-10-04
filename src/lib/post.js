import eos from './eos';
import authManager from './auth';

class PostManager {
  constructor() {
    this.eos = eos;
    this.authManager = authManager;
  }

  async fetchPosts() {
    try {
      const result = await this.eos.getTableRows({
        json: true,
        code: this.authManager.account,
        scope: this.authManager.account,
        table: 'post',
        reverse: true,
        limit: 100,
      });
      // FIXME: remove mock cover
      result.rows.forEach((row) => {
        if (!row.cover) {
          row.cover = 'https://images.unsplash.com/photo-1564428658805-8001c05e05c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80';
        }
      });
      return result.rows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async fetchPost(id) {
    try {
      const result = await this.eos.getTableRows({
        json: true,
        code: this.authManager.account,
        scope: this.authManager.account,
        table: 'post',
        lower_bound: parseInt(id, 10),
        limit: 1,
      });
      // FIXME: remove mock cover
      if (!result.rows[0].cover) {
        result.rows[0].cover = 'https://images.unsplash.com/photo-1564428658805-8001c05e05c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80';
      }
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async fetchPostByCategory(category) {
    try {
      const result = await this.eos.getTableRows({
        json: true,
        code: this.authManager.account,
        scope: this.authManager.account,
        table: 'post',
        reverse: true,
        limit: 100,
        lower_bound: category,
        upper_bound: category,
        key_type: 'name',
        index_position: 2,
      });
      // FIXME: remove mock cover
      result.rows.forEach((row) => {
        if (!row.cover) {
          row.cover = 'https://images.unsplash.com/photo-1564428658805-8001c05e05c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80';
        }
      });
      return result.rows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async createPost(form) {
    try {
      const result = await this.eos.transact({
        actions: [{
          account: this.authManager.account,
          name: 'createpost',
          authorization: [{
            actor: this.authManager.account,
            permission: 'active',
          }],
          data: form,
        }],
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async fetchCategory() {
    try {
      const result = await this.eos.getTableRows({
        json: true,
        code: this.authManager.account,
        scope: this.authManager.account,
        table: 'category',
        limit: 100,
      });
      return result.rows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  async fetchConfig() {
    try {
      const result = await this.eos.getTableRows({
        json: true,
        code: this.authManager.account,
        scope: this.authManager.account,
        table: 'config',
        limit: 1,
      });
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
    return {};
  }

  async updateConfig(form) {
    try {
      const result = await this.eos.transact({
        actions: [{
          account: this.authManager.account,
          name: 'setconfig',
          authorization: [{
            actor: this.authManager.account,
            permission: 'active',
          }],
          data: form,
        }],
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}

export default new PostManager();
