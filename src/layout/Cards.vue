<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="d-flex flex-row flex-nowrap overflow-auto">
        <a-card
          v-for="card in cards"
          @selectCard="selectCard"
          :card="card"
          :key="JSON.stringify(card)"
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
          <div v-if="showLoadMore" id="loadMore" style>
            <a @click="loadMore">Load More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { flatten } from "lodash";
import ACard from "../components/ACard";
import ATransaction from "../components/ATransaction";

export default {
  components: {
    ACard,
    ATransaction
  },
  data() {
    return {
      cards: [],
      transactions: [],
      transactionsPage: 1,
      currentCardId: null,
      showLoadMore: false
    };
  },
  mounted() {
    this.loadCards().then(cards => {
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
              ...balance
            };
            delete balance.balances;
            return balance;
          });
        })
      );
    });
  },
  computed: {
    // ...mapGetters("cards", ["transactions"])
  },
  methods: {
    ...mapActions("cards", ["loadCards", "loadCardTransactions"]),
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
      return this.loadCardTransactions(loadCardTransactionsData).then(
        transactions => {
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
          if (loadMore)
            this.transactions = [...this.transactions, ...newTransactions];
          else this.transactions = newTransactions;
        }
      );
    },
    loadCardTransactionsHandler(cardId, loadMore = false) {
      const loadCardTransactionsData = {
        id: cardId,
        page: this.transactionsPage
      };
      this.getTransactions(loadCardTransactionsData, loadMore);
    },
    resetSelected() {
      this.showLoadMore = false;
      this.transactions = [];
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