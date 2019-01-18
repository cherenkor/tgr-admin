<template>
  <div class="dashboard-main-wrapper">
    <a-navbar/>
    <a-sidebar/>
    <!-- ============================================================== -->
    <!-- wrapper  -->
    <!-- ============================================================== -->
    <div class="dashboard-wrapper">
      <component v-bind:is="currentPage"></component>
      <a-footer/>
    </div>
  </div>
</template>

<script>
import Cards from "./Cards";
import Wallets from "./Wallets";
import FeesLimits from "./FeesLimits";
import Faq from "./FAQ";
import ContactUs from "./ContactUs";
import ASidebar from "../components/sections/ASidebar";
import ANavbar from "../components/sections/ANavbar";
import AFooter from "../components/sections/AFooter";

export default {
  components: {
    Cards,
    Wallets,
    FeesLimits,
    Faq,
    ContactUs,
    ASidebar,
    ANavbar,
    AFooter
  },
  data() {
    return {
      currentPage: ""
    };
  },
  watch: {
    "$route.name": {
      handler(newValue, oldValue) {
        this.currentPage = newValue;
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
</style>