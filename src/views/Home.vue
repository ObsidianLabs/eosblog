<template>
  <div class="home">
    <div class="blog-header">
      EOS Blog
    </div>
    <div class="center-wrapper">
      <PostPreview
        v-for="(post, index) in posts"
        :key="index"
        :title="post.title"
        :content="post.content"
        :author="post.author"
        :category="post.category"
        :created-at="post.created_at"
        :updated-at="post.updated_at"
        :metadata="post.metadata"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import postManager from '@/lib/post';
import PostPreview from '@/components/PostPreview.vue';

export default {
  name: 'home',
  components: {
    PostPreview,
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
      this.posts = await postManager.fetchPosts();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .blog-header {
    width: 100%;
    height: 600px;
    position: relative;
    background-image: url("https://i.imgur.com/7hix8lO.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    font-size: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
  }
}
</style>
