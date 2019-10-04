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
        limit: 5,
      });
      return result.rows;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}

export default new PostManager();
