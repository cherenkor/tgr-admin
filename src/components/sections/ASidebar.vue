<template>
  <div class="nav-left-sidebar sidebar-dark bg-dark">
    <div class="menu-list">
      <nav :class=" { 'navbarOpen': show }" class="navbar navbar-expand-lg navbar-light">
        <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
        <button @click="toggleNavbar" class="navbar-toggler" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="{ 'show': show }" class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-column">
            <li class="nav-item">
              <router-link to="/cards" class="nav-link">
                <font-awesome-icon icon="credit-card"/>
                <span class="ml-2">TGR Cards</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/wallets" class="nav-link">
                <font-awesome-icon icon="wallet"/>
                <span class="ml-2">TGR Wallets</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/fees-limits" class="nav-link">
                <font-awesome-icon icon="percent"/>
                <span class="ml-2">Fees & Limits</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/faq" class="nav-link">
                <font-awesome-icon icon="book-open"/>
                <span class="ml-2">FAQ</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact-us" class="nav-link">
                <font-awesome-icon icon="envelope"/>
                <span class="ml-2">Contact Us</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a
                href="https://drive.google.com/file/d/0BymYUHpBDWYZYXo0Vmh4Z1JpU28/view"
                target="_blank"
                class="nav-link d-lg-none d-xl-none"
              >
                <font-awesome-icon icon="envelope"/>
                <span class="ml-2">Terms & Conditions</span>
              </a>
            </li>
            <li class="nav-item">
              <a @click="logoutUser" class="nav-link d-lg-none d-xl-none">
                <font-awesome-icon icon="sign-out-alt"/>
                <span class="ml-2">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="p-4 d-none d-lg-block d-xl-block">
      <a
        :href="termsUrl"
        :target="termsUrl === '#' ? '' : '_blank'"
        class="terms text-white nav-item"
      >Terms & Conditions</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import config from "../../config/index.js";
const { baseURL } = config;
const token = localStorage.getItem("token", token);
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default {
  data() {
    return {
      show: false,
      termsUrl: "#"
    };
  },
  mounted() {
    axios
      .get(baseURL + "/api/client/reference")
      .then(res => {
        this.termsUrl = res.data.cardholder_agreement_url;
      })
      .catch(console.log);
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logoutUser() {
      this.logout().finally(() => this.$router.push("/"));
    },
    toggleNavbar() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.nav-left-sidebar {
  height: calc(100% - 60px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.terms {
  padding: 12px;
}
.terms:hover {
  width: 236px;
  color: #fff;
  background-color: #15161d;
  padding: 12px;
  border-radius: 2px;
}
</style>