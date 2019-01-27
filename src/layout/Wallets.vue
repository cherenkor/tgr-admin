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
        <h3>Last Transactions</h3>
        <div v-if="noTransactions" class="empty text-center">
          <h4>No transactions</h4>
        </div>
        <div v-else class="transactions-list">
          <div v-for="date in dates" :key="JSON.stringify(date)" class="tranactions-wrapper">
            <div class="w-100 d-flex justify-content-center mt-1 mb-2">
              <span class="badge badge-light">{{date}}</span>
            </div>
            <a-transaction
              v-for="(transaction, i) in transactions[date]"
              :transaction="transaction"
              :key="i"
            />
          </div>
          <div v-if="showLoadMore" id="loadMore" style>
            <a @click="loadMore" class="pointer">Load More</a>
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
import moment from "moment";
import { forEach } from "lodash";

export default {
  components: {
    AWallet,
    ATransaction
  },
  data() {
    return {
      wallets: [],
      transactions: {},
      dates: [],
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
      this.resetSelected();
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
      return this.loadWalletTransactions(loadWalletTransactionsData).then(
        transactions => {
          if (!this.dates.length && !transactions.length)
            this.noTransactions = true;
          if (!transactions.length) {
            this.showLoadMore = false;
            return;
          }
          this.showLoadMore = true;
          const newTransactions = transactions.map(action => {
            action.isPositive = action.type !== "debit";
            action.currency = this.getCurrencySymbol(action.currency);
            action.paymentType =
              action.type === "debit" ? "Out transfer" : "In transfer";
            return action;
          });

          const dates = [];
          const newList = [];
          const transactionsList = newTransactions.reduce((acc, el) => {
            const date = moment(el.date).format("MMM Do YY");
            if (!dates.includes(date)) dates.push(date);
            if (acc[date]) acc[date] = [...acc[date], el];
            else acc[date] = [el];
            return acc;
          }, {});

          forEach(this.transactions, (transactionVal, transactionKey) => {
            forEach(transactionsList, (val, key) => {
              if (transactionKey === key) {
                transactionsList[key] = [...transactionVal, ...val];
              }
            });
          });

          if (loadMore) {
            this.transactions = { ...this.transactions, ...transactionsList };
            this.dates = [
              ...this.dates,
              ...dates.filter(date => !this.dates.includes(date))
            ];
          } else {
            this.transactions = transactionsList;
            this.dates = dates;
          }
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
    resetSelected() {
      this.showLoadMore = false;
      this.noTransactions = false;
      this.transactions = [];
      this.dates = [];
      this.transactionsPage = 1;
    }
  }
};
</script>

<style scoped>
</style>