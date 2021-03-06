<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div v-if="cards && cards.length" class="d-flex flex-row flex-nowrap overflow-auto">
        <a-card
          v-for="(card,i) in cards"
          @selectCard="selectCard"
          :card="{...card, index: i}"
          :key="JSON.stringify(card)"
        />
      </div>
      <div v-else class="text-center w-100">
        <h4>No cards</h4>
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
import { isEmpty, flatten, get, forEach, map, filter, reduce } from "lodash";
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
      transactions: {},
      topUps: {},
      dates: [],
      transactionsPage: 1,
      currentCardId: null,
      showLoadMore: false,
      noTransactions: false,
      loading: true,
      currentCurrency: ""
    };
  },
  async mounted() {
    try {
      const cards = await this.loadCards();
      const topUp = await this.loadCardTopUp();
      if (isEmpty(get(topUp, "data"))) return;

      this.cards = flatten(
        map(cards, (card, i) => {
          card.selected = i === 0;
          card.status = "active";

          return map(card.balances, balance => {
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
      this.currentCardId = get(cards, "[0].id");
      this.loadCardTransactionsHandler(
        get(this.cards, "[0].id"),
        false,
        get(this.cards, "[0].currency")
      );
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("cards", [
      "loadCards",
      "loadCardTransactions",
      "loadCardTopUp"
    ]),
    selectCard({ id, currency }) {
      this.resetSelected();
      this.loadCardTransactionsHandler(id, false, currency);
      this.currentCardId = id;
      this.currentCurrency = currency;

      this.cards = map(this.cards, card => {
        card.selected = card.id === id && card.currency === currency;
        return card;
      });
    },
    loadMore() {
      this.transactionsPage++;
      this.loadCardTransactionsHandler(
        this.currentCardId,
        true,
        this.currentCurrency
      );
    },
    getTransactions(loadCardTransactionsData, loadMore = false) {
      return this.loadCardTransactions(loadCardTransactionsData).then(
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
            action.paymentType = action.type === "debit" ? "Payment" : "Top-Up";
            return action;
          });

          const dates = [];
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
    async loadCardTransactionsHandler(cardId, loadMore = false, currency) {
      try {
        this.loading = true;
        const loadCardTransactionsData = {
          id: cardId,
          page: this.transactionsPage,
          currency
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