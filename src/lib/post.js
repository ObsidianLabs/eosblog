import eos from './eos';
import authManager from './auth';

const mockPost = {
  id: 32,
  title: 'Lorem Ipsum',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  author: 'Leon',
  category: 'default',
  created_at: '',
  updated_at: '',
  metadata: {
    image: '',
    comments: [],
  },
};

class PostManager {
  constructor() {
    this.eos = eos;
    this.authManager = authManager;
  }

  async fetchPosts() {
    try {
      const result = await this.eos.getTableRows({
        json: true,
        code: this.authManager.username,
        scope: this.authManager.username,
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
