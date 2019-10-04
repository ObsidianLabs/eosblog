<template>
  <div class="wrapper" id="app-header">
    <div class="center-wrapper">
      <div class="left">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <div class="right">
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
};
</script>

<style lang="scss" scoped>
#app-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.8);
  height: 50px;
  .center-wrapper {
    display: flex;
    justify-content: space-between;
  }
  a {
    font-weight: bold;
    color: white;
    margin: 0 20px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
