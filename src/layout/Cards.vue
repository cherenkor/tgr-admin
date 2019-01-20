<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="d-flex flex-row flex-nowrap overflow-auto">
        <a-card v-for="(card, i) in cards" @selectCard="selectCard" :card="card" :key="i"/>
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
import { mapActions, mapGetters } from "vuex";
import { filter } from "lodash";
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
      transactionsPage: 1
    };
  },
  mounted() {
    this.loadCards().then(cards => {
      const loadCardTransactionsData = {
        id: cards[0].id,
        page: this.transactionsPage
      };
      this.loadCardTransactions(loadCardTransactionsData).then(transactions => {
        this.transactions = transactions.map(action => {
          action.isPositive = action.amount >= 0;
          action.type = action.amount >= 0 ? "Top-Up" : "Payment";
          action.amount =
            action.amount >= 0 ? "+" + action.amount : action.amount;
        });
      });
      this.cards = cards.map(card => {
        card.status = "active";
        card.balance = "0";
        return card;
      });
    });
  },
  computed: {
    // ...mapGetters("cards", ["transactions"])
  },
  methods: {
    ...mapActions("cards", ["loadCards", "loadCardTransactions"]),
    selectCard(selectedCard) {
      const loadCardTransactionsData = {
        id: selectedCard.id,
        page: this.transactionsPage
      };
      this.transactions = this.loadCardTransactions(loadCardTransactionsData);
      this.cards = this.cards.map(card => {
        card.selected = card.id === selectedCard.id;
        return card;
      });
    },
    getCards() {}
  }
};
</script>

<style scoped>
</style>