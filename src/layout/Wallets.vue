<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div v-if="wallets && wallets.length" class="d-flex flex-row flex-nowrap overflow-auto">
        <a-wallet
          v-for="wallet in wallets"
          @selectWallet="selectWallet"
          :wallet="wallet"
          :key="JSON.stringify(wallet)"
        />
      </div>
      <div v-else class="text-center w-100">
        <h4>No wallets</h4>
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
import { forEach, map, filter, reduce, get } from "lodash";

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
  async mounted() {
    try {
      const wallets = await this.loadWallets();
      this.currentWalletId = get(wallets, "[0].id");
      this.loadCardTransactionsHandler(get(wallets, "[0].id"));

      this.wallets = map(wallets, (wallet, i) => {
        wallet.selected = i === 0;
        wallet.symbol = this.getCurrencySymbol(wallet.currency);
        return wallet;
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("wallets", ["loadWallets", "loadWalletTransactions"]),
    selectWallet(walletId) {
      this.resetSelected();
      this.currentWalletId = walletId;
      this.loadCardTransactionsHandler(walletId);
      this.wallets = map(this.wallets, wallet => {
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
          if (!get(this.dates, "length") && !get(transactions, "length"))
            this.noTransactions = true;
          if (!get(transactions, "length")) {
            this.showLoadMore = false;
            return;
          }
          this.showLoadMore = true;
          const newTransactions = map(transactions, action => {
            action.isPositive = action.type !== "debit";
            action.currency = this.getCurrencySymbol(action.currency);
            action.paymentType =
              action.type === "debit" ? "Out transfer" : "In transfer";
            return action;
          });

          const dates = [];
          const newList = [];
          const transactionsList = reduce(
            newTransactions,
            (acc, el) => {
              const date = moment(el.date).format("MMM Do YY");
              if (!dates.includes(date)) dates.push(date);
              if (acc[date]) acc[date] = [...acc[date], el];
              else acc[date] = [el];
              return acc;
            },
            {}
          );

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
              ...filter(dates, date => !this.dates.includes(date))
            ];
          } else {
            this.transactions = transactionsList;
            this.dates = dates;
          }
        }
      );
    },
    async loadCardTransactionsHandler(cardId, loadMore = false) {
      try {
        this.loading = true;
        const loadCardTransactionsData = {
          id: cardId,
          page: this.transactionsPage
        };
        await this.getTransactions(loadCardTransactionsData, loadMore);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
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