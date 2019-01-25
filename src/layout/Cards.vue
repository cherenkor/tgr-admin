<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="d-flex flex-row flex-nowrap overflow-auto">
        <a-card
          v-for="(card,i) in cards"
          @selectCard="selectCard"
          :card="{...card, index: i}"
          :key="JSON.stringify(card)"
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
import { mapActions, mapGetters } from "vuex";
import { flatten, get } from "lodash";
import ACard from "../components/ACard";
import ATransaction from "../components/ATransaction";
import moment from "moment";

export default {
  components: {
    ACard,
    ATransaction
  },
  data() {
    return {
      cards: [],
      transactions: [],
      topUps: {},
      dates: [],
      transactionsPage: 1,
      currentCardId: null,
      showLoadMore: false,
      noTransactions: false,
      loading: true
    };
  },
  mounted() {
    this.loadCards().then(cards => {
      this.loadCardTopUp().then(topUp => {
        if (!get(topUp, "data")) return;

        this.currentCardId = cards[0].id;
        this.loadCardTransactionsHandler(cards[0].id);

        this.cards = flatten(
          cards.map((card, i) => {
            card.selected = i === 0;
            card.status = "active";

            return card.balances.map(balance => {
              balance.symbol = this.getCurrencySymbol(balance.currency);
              balance = {
                ...card,
                ...balance,
                topUp: topUp.data
              };
              delete balance.balances;
              return balance;
            });
          })
        );
      });
    });
  },
  methods: {
    ...mapActions("cards", [
      "loadCards",
      "loadCardTransactions",
      "loadCardTopUp"
    ]),
    selectCard({ id, currency }) {
      if (this.currentCardId !== id) {
        this.loadCardTransactionsHandler(id);
        this.resetSelected();
      }
      this.currentCardId = id;

      this.cards = this.cards.map(card => {
        card.selected = card.id === id && card.currency === currency;
        return card;
      });
    },
    loadMore() {
      this.transactionsPage++;
      this.loadCardTransactionsHandler(this.currentCardId, true);
    },
    getTransactions(loadCardTransactionsData, loadMore = false) {
      this.noTransactions = false;
      return this.loadCardTransactions(loadCardTransactionsData).then(
        transactions => {
          if (!this.dates.length && !transactions.length)
            this.noTransactions = true;
          if (!transactions.length) {
            this.showLoadMore = false;
            return;
          }
          this.showLoadMore = true;
          const newTransactions = transactions.map(action => {
            action.isPositive = action.amount >= 0;
            const currency = this.getCurrencySymbol(action.currency);
            action.type = action.amount >= 0 ? "Top-Up" : "Payment";
            action.amount =
              action.amount >= 0
                ? `+${currency}${action.amount}`
                : action.amount.toString().replace("-", `-${currency}`);
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

          if (loadMore) {
            this.transactions = { ...this.transactions, ...transactionsList };
            this.dates = [...this.dates, ...dates];
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
      this.transactions = [];
      this.dates = [];
      this.transactionsPage = 1;
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