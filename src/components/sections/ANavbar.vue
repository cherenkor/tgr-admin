<template>
  <div class="dashboard-header">
    <nav class="navbar navbar-expand-lg bg-dark fixed-top">
      <div class="logo">
        <img src="../../assets/img/tgr_logo_large.svg" alt>
        <span class="ml-2">TGR</span>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto navbar-right-top">
          <li class="nav-item nav-user">Welcome, {{ username }}</li>
          <li id="logout" class="nav-item dropdown connection">
            <a @click="logoutUser">
              <font-awesome-icon icon="sign-out-alt"/>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: localStorage.getItem("name")
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logoutUser() {
      this.logout().finally(() => this.$router.push("/"));
    }
  }
};
</script>

<style scoped>
.logo {
  height: 60px;
  padding: 12px;
  display: flex;
  align-items: center;
}
.logo img {
  height: 100%;
}
.logo span {
  font-size: 32px;
}
#logout {
  cursor: pointer;
}
#logout .fa-sign-out-alt {
  font-size: 18px;
  transition: all 0.1s;
}
#logout .fa-sign-out-alt:hover {
  transform: scale(1.2);
  color: #f2a181;
}
</style>