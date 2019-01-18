<template>
  <div class="card-block">
    <div class="card shadow">
      <div @click="selectCard" class="card-body text-center">
        <div class="card-logo">
          <img src="../assets/img/tgr_logo_large.svg" alt>
        </div>
        <div class="card-balance">
          <h5 class="text-grey m-0">Balance</h5>
          <h2 class="text-white mt-0">${{ card.balance }}</h2>
        </div>
        <div class="card-number">
          <h3 class="text-white m-0">{{ card.number }}</h3>
        </div>
        <div class="mt-4 card-status d-flex justify-between w-100">
          <span class="text-capitalize">{{ card.status }}</span>
          <span class="text-grey">Expires: {{ card.expires }}</span>
        </div>
      </div>
    </div>
    <div class="card-actions d-flex justify-content-center">
      <div v-if="card.selected" class="card-actions-btns d-flex justify-content-center">
        <div class="card-action-btn">
          <font-awesome-icon icon="cog"/>
        </div>
        <div class="card-action-btn">
          <font-awesome-icon icon="shield-alt"/>
        </div>
        <div class="card-action-btn">
          <font-awesome-icon icon="plus"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      required: true,
      default: ""
    }
  },
  methods: {
    selectCard() {
      this.$emit("selectCard", this.card);
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
.card-actions {
  color: #7ac0b4;
}
.card-action-btn {
  cursor: pointer;
  border-radius: 0.5rem;
  margin-right: 12px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card-action-btn:hover {
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.25), 0 8px 8px rgba(0, 0, 0, 0.22);
}
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}
.shadow:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
}
</style>