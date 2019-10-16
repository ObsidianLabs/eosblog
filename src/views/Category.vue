<template>
  <div class="wrapper" id="category">
    <div class="center-wrapper">
      <h1>Discover posts by category</h1>
      <div class="category-wrapper">
        <div class="category-index">
          <div
            v-for="category in categories"
            :key="category.categoryname"
            @click="fetchPostByCategory(category.categoryname)">
            {{ category.categoryname }}
          </div>
        </div>
        <div class="category-content">
          <!-- <div
            v-for="post in categoryPosts"
            :key="post.id"
            @click="">
            {{ post.title }}
          </div> -->
          <PostCard
            v-for="post in categoryPosts"
            size="small"
            :key="post.id"
            :title="post.title"
            :content="post.content"
            :cover="post.cover"
            :author="post.author"
            :category="post.category"
            :created-at="post.created_at"
            :updated-at="post.updated_at"
            :metadata="JSON.parse(post.metadata || '{}')"
            @click.native="$router.push(`/post/${post.id}`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue';

export default {
  name: 'category',
  data() {
    return {
      name: '',
      categories: [],
      selectedCategory: '',
      categoryPosts: [],
    };
  },
  components: {
    PostCard,
  },
  methods: {
    async fetchCategory() {
      this.categories = await this.$post.fetchCategory() || [];
    },
    async fetchPostByCategory(category) {
      this.selectedCategory = category;
      if (this.selectedCategory) {
        this.categoryPosts = await this.$post.fetchPostByCategory(this.selectedCategory);
      } else {
        this.categoryPosts = [];
      }
    },
  },
  mounted() {
    this.fetchCategory();
  },
};
</script>

<style lang="scss" scoped>
#category {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw 0;
  h1 {
    padding: 2vw 0;
    text-align: center;
  }
  .center-wrapper {
    display: flex;
    flex-direction: column;
  }
  .category-wrapper {
    display: flex;
    .category-index {
      flex: 0 0 150px;
      border-right: solid 1px #ddd;
      padding: 0 10px;
      > div {
        cursor: pointer;
        margin: 10px 0;
      }
    }
    .category-content {
      flex: 1 0;
      margin: 0 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>
