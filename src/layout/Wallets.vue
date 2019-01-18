<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="d-flex flex-row flex-nowrap overflow-auto">
        <a-wallet
          v-for="(wallet, i) in wallets"
          @selectWallet="selectWallet"
          :wallet="wallet"
          :key="i"
        />
      </div>
      <hr>
      <div id="transactions" class="mt-4">
        <h2 class="text-grey">Last Transactions</h2>
        <div class="transactions-list">
          <a-transaction
            v-for="(transaction, i) in transactions"
            :transaction="transaction"
            :key="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AWallet from "../components/AWallet";
import ATransaction from "../components/ATransaction";

export default {
  components: {
    AWallet,
    ATransaction
  },
  data() {
    return {
      wallets: [
        {
          id: 1,
          balance: 200,
          currency: "EUR",
          selected: true
        },
        {
          id: 2,
          balance: 320,
          currency: "BTC",
          selected: false
        }
      ],
      transactions: [
        {
          isPositive: true,
          type: "System",
          amount: "+$200"
        },
        {
          isPositive: false,
          type: "System",
          amount: "-$200"
        },
        {
          isPositive: false,
          type: "System",
          amount: "-$200"
        },
        {
          isPositive: true,
          type: "System",
          amount: "+$250"
        },
        {
          isPositive: true,
          type: "System",
          amount: "+$1700"
        }
      ]
    };
  },
  methods: {
    selectWallet(selectedWallet) {
      this.transactions = [
        {
          isPositive: false,
          type: "System",
          amount: "-$200"
        },
        {
          isPositive: true,
          type: "System",
          amount: "+$250"
        },
        {
          isPositive: true,
          type: "System",
          amount: "+$1700"
        }
      ];
    }
  }
};
</script>

<style scoped>
</style>