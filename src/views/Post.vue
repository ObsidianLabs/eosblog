<template>
  <div class="wrapper" id="post">
    <div class="center-wrapper">
      <article v-if="post">
        <header class="post-header">
          <div class="post-meta">
            <time>{{ post.created_at }}</time>
            <span>/</span>
            <a @click="$router.push(`/category/${post.category}`)">{{ post.category }}</a>
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
export default {
  name: 'post',
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      post: undefined,
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
