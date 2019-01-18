<template>
  <div class="nav-left-sidebar sidebar-dark bg-dark">
    <div class="menu-list">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
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
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>