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
body {
  font-family: "Liberation Sans", "Arial", sans-serif !important;
}
#app {
  margin: 0;
  padding: 0;
}
</style>
