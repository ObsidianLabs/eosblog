<template>
  <header class="wrapper" id="site-header" :style="headerStyle">
    <div class="center-wrapper">
      <div class="site-header-content" :class="mode">
        <h1 class="site-title">{{ config.blogname }}</h1>
        <h2 class="site-description">{{ config.description }}</h2>
      </div>
      <div class="site-nav" :class="mode">
        <div class="left">
          <router-link to="/">Home</router-link>
          <router-link to="/category">Category</router-link>
          <!-- <router-link to="/about">About</router-link> -->
          <a href="https://eosstudio.io" target="__blank">About</a>
        </div>
        <div class="right">
          <Dropdown v-if="isLogin">
            <a href="javascript:void(0)">
              {{ this.$auth.account }}
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>
                <router-link tag="div" to="/compose">New Post</router-link>
              </DropdownItem>
              <DropdownItem>
                <router-link tag="div" to="/dashboard">Dashboard</router-link>
              </DropdownItem>
              <DropdownItem divided @click="resetConfirm = true">Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <router-link v-else to="/login">Login</router-link>
          <div class="reset" @click="resetConfirm = true">
            <Icon type="ios-refresh" size="18"/>
          </div>
        </div>
        <Modal
          v-model="resetConfirm"
          title="Are you sure to Reset?"
          transfer
          @on-ok="reset"
          @on-cancel="resetConfirm = false"
          ok-text="Confirm"
          cancel-text="Cancel">
          <p>Site will be reset to the initial status.</p>
          <p>You will be redirected to the welcome page.</p>
        </Modal>
      </div>
    </div>
  </header>
</template>

<script>
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Modal,
} from 'iview';

export default {
  name: 'site-header',
  data() {
    return {
      mode: 'large',
      isLogin: false,
      resetConfirm: false,
      config: {},
    };
  },
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Icon,
    Modal,
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url('${this.config.cover}')`,
      };
    },
  },
  methods: {
    async fetchConfig() {
      const result = await this.$post.fetchConfig();
      this.config = result;
    },
    handleRouteChange() {
      if (this.$route.name === 'home') {
        this.mode = 'large';
      } else {
        this.mode = 'small';
      }
      this.isLogin = this.$auth.isLogin();
      this.fetchConfig();
    },
    reset() {
      localStorage.removeItem('account');
      localStorage.removeItem('endpoint');
      localStorage.removeItem('auth');
      this.$router.replace('/welcome');
    },
  },
  mounted() {
    this.handleRouteChange();
    this.fetchConfig();
  },
  watch: {
    $route() {
      this.handleRouteChange();
    },
  },
};
</script>

<style lang="scss" scoped>
$transition-time: 1s;
#site-header {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  .center-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    display: block;
  }
  .site-header-content {
    transition: all $transition-time ease;
    &.large {
      padding: 10vw 4vw;
    }
    &.small {
      padding: 0vw 4vw;
      height: 0;
      opacity: 0;
    }
    .site-title {
      font-family: "Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
      margin: 0;
      padding: 0;
      font-size: 3.8rem;
      font-weight: 400;
      letter-spacing: 2px;
    }
    .site-description {
      margin: 0;
      padding: 5px 0;
      font-size: 2.2rem;
      font-weight: 300;
      letter-spacing: .5px;
      opacity: .8;
    }
  }
  .site-nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    letter-spacing: .4px;
    font-size: 100%;
    padding: 0 10px;
    transition: all $transition-time ease;
    &.large {
      top: -70px;
    }
    &.small {
      top: 0;
    }
    .left {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      a {
        padding: 10px 12px;
        margin: 0 2px;
        color: #fff;
        opacity: .8;
        transition: all .2s ease;
        &:hover {
          text-decoration: none;
          opacity: 1;
        }
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a {
        display: block;
        padding: 4px 12px;
        margin: 0 10px;
        border: 1px solid #fff;
        color: #fff;
        font-size: 1.2rem;
        line-height: 1em;
        border-radius: 10px;
        opacity: .8;
        transition: all .2s ease;
        &:hover {
          text-decoration: none;
          opacity: 1;
        }
      }
    }
    .reset {
      cursor: pointer;
      opacity: .4;
      transition: all .2s ease;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
