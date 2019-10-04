<template>
  <div class="wrapper" id="app-footer">
    <div class="center-wrapper">
      Copyright © 2019, Obsidian Labs. All Right Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style lang="scss" scoped>
#app-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.8);
  height: 50px;
  color: white;
  margin-top: 60px;
  .center-wrapper {
    display: flex;
  }
}
</style>
