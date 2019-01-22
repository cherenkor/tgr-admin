<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="d-flex flex-row flex-nowrap overflow-auto">
        <a-wallet
          v-for="wallet in wallets"
          @selectWallet="selectWallet"
          :wallet="wallet"
          :key="JSON.stringify(wallet)"
        />
      </div>
      <hr>
      <div id="transactions" class="mt-4">
        <h2>Last Transactions</h2>
        <div v-if="noTransactions" class="empty text-center">
          <h4>No transactions</h4>
        </div>
        <div v-else class="transactions-list">
          <a-transaction
            v-for="(transaction, i) in transactions"
            :transaction="transaction"
            :key="i"
          />
          <div v-if="showLoadMore" id="loadMore" style>
            <a @click="loadMore">Load More</a>
          </div>
        </div>

        <spinner v-if="loading"/>
      </div>
    </div>
  </div>
</template>

<script>
import AWallet from "../components/AWallet";
import ATransaction from "../components/ATransaction";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AWallet,
    ATransaction
  },
  data() {
    return {
      wallets: [],
      transactions: [],
      transactionsPage: 1,
      currentWalletId: null,
      showLoadMore: false,
      noTransactions: false,
      loading: true
    };
  },
  mounted() {
    this.loadWallets().then(wallets => {
      this.currentWalletId = wallets[0].id;
      this.loadCardTransactionsHandler(wallets[0].id);

      this.wallets = wallets.map((wallet, i) => {
        wallet.selected = i === 0;
        wallet.symbol = this.getCurrencySymbol(wallet.currency);
        return wallet;
      });
    });
  },
  methods: {
    ...mapActions("wallets", ["loadWallets", "loadWalletTransactions"]),
    selectWallet(walletId) {
      this.showLoadMore = false;
      this.transactions = [];
      this.transactionsPage = 1;
      this.currentWalletId = walletId;
      this.loadCardTransactionsHandler(walletId);
      this.wallets = this.wallets.map(wallet => {
        wallet.selected = wallet.id === walletId;
        return wallet;
      });
    },
    loadMore() {
      this.transactionsPage++;
      this.loadCardTransactionsHandler(this.currentWalletId, true);
    },
    getTransactions(loadWalletTransactionsData, loadMore = false) {
      this.noTransactions = false;
      return this.loadWalletTransactions(loadWalletTransactionsData).then(
        transactions => {
          if (!this.transactions.length && !transactions.length)
            this.noTransactions = true;
          if (!transactions.length) {
            this.showLoadMore = false;
            return;
          }
          this.showLoadMore = true;
          const newTransactions = transactions.map(action => {
            action.isPositive = action.amount >= 0;
            const currency = this.getCurrencySymbol(action.currency);
            action.type = action.amount >= 0 ? "In transfer" : "Out transfer";
            action.amount =
              action.amount >= 0
                ? `+${currency}${action.amount}`
                : action.amount.toString().replace("-", `-${currency}`);
            return action;
          });
          if (loadMore)
            this.transactions = [...this.transactions, ...newTransactions];
          else this.transactions = newTransactions;
        }
      );
    },
    loadCardTransactionsHandler(cardId, loadMore = false) {
      this.loading = true;
      const loadCardTransactionsData = {
        id: cardId,
        page: this.transactionsPage
      };
      this.getTransactions(loadCardTransactionsData, loadMore).finally(
        () => (this.loading = false)
      );
    },
    getCurrencySymbol(name) {
      const list = {
        EUR: "€",
        USD: "$",
        GBP: "£",
        RUB: "₽"
      };
      return list[name] || name;
    }
  }
};
</script>

<style scoped>
</style>