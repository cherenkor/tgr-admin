<template>
  <div class="card-block pointer">
    <div class="card shadow">
      <div @click="selectWallet" class="card-body text-center w-100">
        <div class="card-logo">
          <img src="../assets/img/tgr_logo_large.svg" alt>
        </div>
        <div class="wallet-balance">
          <h5 class="text-grey m-0 text-uppercase">Balance</h5>
          <h2 class="text-white mt-0">{{ balanceString }}</h2>
        </div>
        <div class="wallet-currency mb-4">
          <h3 class="text-white m-0">TGR Wallet({{ wallet.currency }})</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wallet: {
      required: true,
      default: ""
    }
  },
  computed: {
    balanceString() {
      return `${this.wallet.symbol} ${this.separateThousands(
        this.wallet.balance
      )}`;
    }
  },
  methods: {
    selectWallet() {
      this.$emit("selectWallet", this.wallet.id);
    }
  }
};
</script>

<style scoped>
.card-block {
  width: 320px;
  margin: 3%;
}
.card {
  background-color: #2c2c2c;
  border: 2px solid #fff;
  color: #fff;
  width: 320px;
  border-radius: 8px;
}
.card-logo {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 20px;
}
.card-logo img {
  height: 46px;
}
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}
.shadow:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
}
</style>