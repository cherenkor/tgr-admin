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
                <i class="fa fa-fw fa-rocket"></i>TGR Cards
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/wallets" class="nav-link">
                <i class="fa fa-fw fa-rocket"></i>TGR Wallets
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/fees-limits" class="nav-link">
                <i class="fa fa-fw fa-rocket"></i>Fees & Limits
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/faq" class="nav-link">
                <i class="fa fa-fw fa-rocket"></i>FAQ
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact-us" class="nav-link">
                <i class="fa fa-fw fa-rocket"></i>Contact Us
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