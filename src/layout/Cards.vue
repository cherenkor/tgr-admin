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
import ACard from "../components/ACard";
import ATransaction from "../components/ATransaction";

export default {
  components: {
    ACard,
    ATransaction
  },
  data() {
    return {
      cards: [
        {
          id: 1,
          balance: 200,
          number: "5232 **** **** 4372",
          status: "active",
          expires: "11/2042",
          selected: true
        },
        {
          id: 2,
          balance: 320,
          number: "4112 **** **** 4372",
          status: "blocked",
          expires: "12/2022",
          selected: false
        }
      ],
      transactions: [
        {
          isPositive: true,
          type: "Top-Up",
          amount: "+$200",
          description:
            "Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)"
        },
        {
          isPositive: false,
          type: "Payment",
          amount: "-$200",
          description:
            "Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)"
        },
        {
          isPositive: false,
          type: "Payment",
          amount: "-$200",
          description:
            "Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)"
        },
        {
          isPositive: true,
          type: "Top-Up",
          amount: "+$250",
          description:
            "Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)"
        },
        {
          isPositive: true,
          type: "Top-Up",
          amount: "+$1700",
          description:
            "Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)"
        }
      ]
    };
  },
  methods: {
    selectCard(selectedCard) {
      this.cards = this.cards.map(card => {
        card.selected = card.id === selectedCard.id;
        return card;
      });
    }
  }
};
</script>

<style scoped>
</style>