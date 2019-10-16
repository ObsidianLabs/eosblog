<template>
  <article class="wrapper post-card" :class="size">
    <div class="post-card-cover" :style="coverStyle" :class="size">
    </div>
    <div class="post-card-content" :class="size">
      <header>
        <span class="post-card-category">{{ category }}</span>
        <h2 class="post-card-title">{{ title }}</h2>
      </header>
      <section>
        <p class="post-card-excerpt">
          {{ content }}
        </p>
      </section>
      <footer>
        <span class="post-card-created">
          {{ createdAt }}
        </span>
      </footer>
    </div>
  </article>
</template>

<script>
export default {
  name: 'post-card',
  props: {
    size: {
      reqired: false,
      type: String,
      default: 'large',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
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
      type: [String, Number],
      required: true,
    },
    updatedAt: {
      type: [String, Number],
      required: true,
    },
    metadata: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
    coverStyle() {
      return {
        backgroundImage: `url(${this.cover})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  display: flex;
  border-radius: 5px;
  background: #fff 50%;
  background-size: cover;
  box-shadow: 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03);
  overflow: hidden;
  margin-bottom: 40px;
  transition: all .5s ease;
  cursor: pointer;
  &.large {
    flex-direction: row;
    width: 100%;
    height: 400px;
  }
  &.medium {
    flex-direction: column;
    width: 48%;
    height: 425px;
  }
  &.small {
    flex-direction: column;
    width: 30.5%;
    height: 450px;
  }
  .post-card-cover {
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    flex: 1 0;
    &.large {
      flex: 20 0;
    }
    &.medium {
      flex: 6 0;
    }
    &.small {
      flex: 5 0;
    }
  }
  .post-card-content {
    flex: 6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    &.large {
      padding: 30px 40px;
      .post-card-category {
        font-size: 12px;
        margin-bottom: 4px;
      }
      .post-card-title {
        font-size: 26px;
        line-height: 1.6;
      }
      section {
        padding: 20px 0;
        font-size: 16px;
      }
    }
    &.medium, &.small {
      padding: 25px;
      .post-card-category {
        font-size: 10px;
      }
      .post-card-title {
        font-size: 20px;
        line-height: 1.4;
      }
      section {
        padding: 10px 0;
        font-size: 14px;
      }
    }
    &.medium {
      section {
        padding: 16px 0;
      }
    }

    header {
      flex: 0 0 46px;
      .post-card-category {
        display: block;
        color: #738a94;
        font-weight: 500;
        letter-spacing: .5px;
        text-transform: uppercase;
      }
    }
    section {
      overflow: hidden;
      width: 100%;
      p {
        display: block;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
    }
    footer {
      flex: 0 0 24px;
      display: flex;
      .post-card-created {
        flex: 1 0;
        justify-content: flex-end;
        display: flex;
        align-items: center;
        color: #738a94;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: .5px;
        text-transform: uppercase;
      }
    }
  }
  &:hover {
    transform: translate3D(0,-1px,0) scale(1.02);
  }
}
</style>
