<template>
  <div id="app">
    <site-header v-if="$route.name !== 'welcome'"/>
    <router-view class="site-body"/>
    <site-footer v-if="$route.name !== 'welcome'" class="site-footer"/>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header.vue';
import SiteFooter from '@/components/Footer.vue';

export default {
  components: {
    SiteHeader,
    SiteFooter,
  },
};
</script>

<style lang="scss">
html {
  // overflow-x: hidden;
  font-size: 62.5%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
body {
  // overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1.5rem;
  line-height: 1.6em;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  background: #cbeafb;
  margin: 0 !important;
  padding: 0 !important;
  height: 100%;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga" on;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 800px;
  // overflow-x: scroll;
  .site-body {
    flex: 1 0;
  }
  .site-footer {
    flex-shrink: 0;
  }
  .center-wrapper {
    width: 100% ;
    min-width: 800px;
    max-width: 1040px;
  }

}
</style>
