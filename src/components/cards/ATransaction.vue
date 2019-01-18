<template>
  <div class="row transaction mb-3">
    <div class="col-12">
      <div class="d-flex">
        <div class="icon-wrap d-flex mr-4 align-items-center">
          <font-awesome-icon :class="iconClass" :icon="icon"/>
        </div>
        <div class="mr-4 w-100">
          <h4 class="m-0">{{ transaction.type }}</h4>
          <h6
            class="m-0 word-break-word"
          >Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)</h6>
        </div>
        <div class="text-right d-flex align-items-center">
          <h4 class="m-0">{{ transaction.amount }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      required: true
    }
  },
  computed: {
    iconClass() {
      return this.transaction.isPositive ? "text-coral" : "text-orange";
    },
    icon() {
      return this.transaction.isPositive
        ? "arrow-alt-circle-down"
        : "arrow-alt-circle-up";
    }
  }
};
</script>

<style scoped>
.transaction {
  cursor: pointer;
  padding: 18px 10px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.transaction:hover {
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.25), 0 8px 8px rgba(0, 0, 0, 0.22);
}
.icon-wrap {
  font-size: 24px;
}
</style>