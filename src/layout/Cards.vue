<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="d-flex flex-row flex-nowrap overflow-auto">
        <!-- <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card">
            <h5 class="card-header">Total Income</h5>
            <div class="card-body">
              <div class="metric-value d-inline-block">
                <h1 class="mb-1">$5,79,000</h1>
              </div>
              <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                <span class="icon-circle-small icon-box-xs text-success bg-success-light">
                  <i class="fa fa-fw fa-arrow-up"></i>
                </span>
                <span class="ml-1">25%</span>
              </div>
            </div>
            <div class="card-body bg-light p-t-40 p-b-40">
              <div id="sparkline-revenue"></div>
            </div>
            <div class="card-footer text-center bg-white">
              <a href="#" class="card-link">View Details</a>
            </div>
          </div>
        </div>-->
        <div class="card-block">
          <div class="card shadow">
            <div class="card-body text-center">
              <div class="card-logo">
                <img src="../assets/img/tgr_logo_large.svg" alt>
              </div>
              <div class="card-balance">
                <h5 class="text-grey m-0">Balance</h5>
                <h2 class="text-white mt-0">$200</h2>
              </div>
              <div class="card-number">
                <h3 class="text-white m-0">5219 **** **** 5608</h3>
              </div>
              <div class="mt-4 card-status d-flex justify-between w-100">
                <span class="text-capitalize">Active</span>
                <span class="text-grey">Expires: 12/2022</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-block">
          <div class="card shadow">
            <div class="card-body text-center">
              <div class="card-logo">
                <img src="../assets/img/tgr_logo_large.svg" alt>
              </div>
              <div class="card-balance">
                <h5 class="text-grey m-0">Balance</h5>
                <h2 class="text-white mt-0">$200</h2>
              </div>
              <div class="card-number">
                <h3 class="text-white m-0">5219 **** **** 5608</h3>
              </div>
              <div class="mt-4 card-status d-flex justify-between w-100">
                <span class="text-capitalize">Active</span>
                <span class="text-grey">Expires: 12/2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
.card-block {
  width: 320px;
  margin: 3%;
}
.card {
  background-color: #2c2c2c;
  color: #fff;
  width: 320px;
  border-radius: 24px;
}
.card-body {
  text-transform: uppercase;
  width: 100%;
}
.card-logo {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 20px;
}
.card-logo img {
  height: 100%;
}
.card-status {
  justify-content: space-between;
  font-size: 13px;
}
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}
.shadow:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
}
</style>