<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import "./assets/css/admin.css";
@import "./assets/css/custom.css";

#app {
  margin: 0;
  padding: 0;
}
</style>
