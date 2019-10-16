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
          <div v-for="post in categoryPosts" :key="post.id">{{ post.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      flex: 0 0 200px;
      border-right: solid 1px #ddd;
      padding: 10px;
    }
    .category-content {
      flex: 1 0;
      padding: 10px;
    }
  }
}
</style>
