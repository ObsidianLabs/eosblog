<template>
  <div class="wrapper" id="post">
    <div class="center-wrapper">
      <article v-if="post">
        <header class="post-header">
          <div class="post-meta">
            <time>{{ formatTime(post.created_at) }}</time>
            <span>/</span>
            <a @click="$router.push(`/category/${post.category}`)">{{ post.category }}</a>
            <span v-if="$auth.isLogin()">/</span>
            <a  v-if="$auth.isLogin()" @click="$router.push(`/compose/${post.id}`)">Edit</a>
            <span v-if="$auth.isLogin()">/</span>
            <a v-if="$auth.isLogin()" @click="showDeleteConfirm = true">Delete</a>
            <Modal
              v-model="showDeleteConfirm"
              title="Are you sure to delete this post?"
              okText="Confirm"
              cancelText="Cancel"
              @on-ok="deletePost"
              @on-cancel="showDeleteConfirm = false">
              <p>The post will be deleted from your account.</p>
            </Modal>
          </div>
          <h1 class="post-title">{{ post.title }}</h1>
        </header>
        <figure class="post-cover" v-if="post.cover" :style="coverStyle"></figure>
        <section class="post-content" :style="contentStyle">
          <p>{{ post.content }}</p>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { Modal } from 'iview';

export default {
  name: 'post',
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: {
    Modal,
  },
  data() {
    return {
      post: undefined,
      showDeleteConfirm: false,
    };
  },
  computed: {
    coverStyle() {
      return this.post ? {
        backgroundImage: `url(${this.post.cover})`,
      } : {};
    },
    contentStyle() {
      return this.post && this.post.cover ? {
        marginTop: '-180px',
      } : {};
    },
  },
  mounted() {
    this.fetchPost(this.id);
  },
  methods: {
    async fetchPost(id) {
      this.post = await this.$post.fetchPost(id);
      console.log(this.post);
    },
    formatTime(unix) {
      return dayjs.unix(unix).format('YYYY-MM-DD');
    },
    async deletePost() {
      const result = await this.$post.deletePost(this.id);
      if (result) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#post {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3vw 0;
  }
  .post-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3vw 0;
    .post-meta {
      font-size: 1.4rem;
      font-weight: 500;
      text-transform: uppercase;
      a,time {
        color: #3eb0ef;
        letter-spacing: .4px;
      }
      span {
        margin: 0 10px;
        color: #738a94;
      }
    }
    .post-title {
      color: #090a0b;
      font-size: 5rem;
      font-weight: 700;
    }
  }
  .post-cover {
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 800px;
    border-radius: 5px;
    position: relative;
  }
  .post-content {
    width: 80%;
    background-color: white;
    z-index: 100;
    padding: 70px 100px;
    box-shadow: 0px -20px 38px 5px rgba(39,44,49,.04);
    font-size: 2.2rem;
    line-height: 2.2em;
  }
  .center-wrapper {
    max-width: 1340px;
  }
}
</style>
