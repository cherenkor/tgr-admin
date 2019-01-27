<template>
  <div class="row transaction mb-3">
    <div class="col-12">
      <div class="d-flex">
        <div class="icon-wrap d-flex mr-4 align-items-center">
          <font-awesome-icon :class="iconClass" :icon="icon"/>
        </div>
        <div class="mr-4 w-100">
          <h4 class="m-0">{{ transaction.paymentType }}</h4>
          <h6
            v-if="transaction.description"
            class="m-0 word-break-word"
          >{{ transaction.description }}</h6>
        </div>
        <div class="amount text-right d-flex align-items-center justify-content-end">
          <h4 class="m-0">{{ transactionAmount }}</h4>
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
    transactionAmount() {
      const amount = this.separateThousands(Math.abs(this.transaction.amount));
      const currency = this.transaction.currency;
      const symbol = this.transaction.type === "debit" ? "-" : "+";
      return `${symbol}${currency}${amount}`;
    },
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
  padding: 18px 10px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.icon-wrap {
  font-size: 24px;
}
.amount,
.amount h4 {
  width: max-content;
}
</style>