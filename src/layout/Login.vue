<template>
  <div id="login-page" class="container-fluid">
    <div class="logo">
      <img src="../assets/img/tgr_logo_large.svg" alt>
    </div>
    <div class="login-form">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend icon">
            <span class="input-group-text">
              <font-awesome-icon icon="envelope"/>
            </span>
          </div>
          <input type="text" class="form-control" placeholder="Username">
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend icon">
            <span class="input-group-text">
              <font-awesome-icon icon="lock"/>
            </span>
          </div>
          <input type="password" class="form-control" placeholder="Password">
        </div>
      </div>
      <button @click="login" class="btn btn-primary w-100">Enter</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },
  methods: {
    ...mapActions("auth", ["login"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10%;
  height: 100vh;
  background: #41414a;
}
#login-page .logo img {
  width: 126px;
  padding: 3em 0;
}
.login-form {
  width: 360px;
}
</style>
