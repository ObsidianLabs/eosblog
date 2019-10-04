<template>
  <div class="wrapper post-preview">
    <div class="header">
      <div class="tags">
        <Tag type="border">foo</Tag>
        <Tag type="border">bar</Tag>
      </div>
    </div>
    <div class="title">{{ title }}</div>
    <div class="content">
      {{ content.split(' ', 40).join(' ') }} ...
      <a>read more</a>
    </div>
    <div class="footer">
      <div class="info">
        <div class="created-at">{{ createdAt }}</div>
        <div class="author">{{ author }}</div>
        <div class="category">{{ category }}</div>
      </div>
      <div class="share">share</div>
    </div>
  </div>
</template>

<script>
import { Tag } from 'iview';

export default {
  name: 'post-preview',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  components: {
    Tag,
  },
};
</script>

<style lang="scss" scoped>
.post-preview {
  text-align: left;
  padding: 10px 50px;
  .header {
    padding: 10px 0;
  }
  .footer {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    .info {
      flex: 1;
      display: flex;
      > div {
        margin-right: 40px;
      }
    }
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.5;
  }
  .content {
    font-family: "sofia-pro", "Ubuntu", sans-serif;
    line-height: 24px;
    font-size: 16px;
  }
}
</style>
