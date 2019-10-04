<template>
  <div class="home">
    <div class="center-wrapper">
      <PostCard
        v-for="(post, index) in posts"
        :size="getSize(index)"
        :key="post.id"
        :title="post.title"
        :content="post.content"
        :cover="post.cover"
        :author="post.author"
        :category="post.category"
        :created-at="post.created_at"
        :updated-at="post.updated_at"
        :metadata="JSON.parse(post.metadata || '{}')"
        @click.native="handleRoute(post.id)"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PostCard from '@/components/PostCard.vue';

export default {
  name: 'home',
  components: {
    PostCard,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      this.posts = await this.$post.fetchPosts();
      // this.posts = [
      //   ...this.posts,
      //   ...this.posts,
      //   ...this.posts,
      //   ...this.posts,
      //   ...this.posts,
      // ];
    },
    handleRoute(id) {
      this.$router.push(`/post/${id}`);
    },
    getSize(index) {
      if (index % 6 === 0) {
        return 'large';
      } if (index % 6 === 4 || index % 6 === 5) {
        return 'medium';
      }
      return 'small';
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .center-wrapper {
    margin-top: -70px;
    padding-top: 0;
    z-index: 100;
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
