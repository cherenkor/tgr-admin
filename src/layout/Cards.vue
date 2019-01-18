<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="d-flex flex-row flex-nowrap overflow-auto">
        <a-card v-for="(card, i) in cards" @selectCard="selectCard" :card="card" :key="i"/>
      </div>
      <hr>
      <div id="transactions" class="mt-4">
        <h1>Transactions</h1>
        <div class="transactions-list">
          <a-transaction
            v-for="(transaction, i) in transactions"
            :transaction="transaction"
            :key="i"
          />
          <!-- <div class="row transaction mb-3">
            <div class="col-12">
              <div class="d-flex">
                <div class="icon-wrap d-flex mr-4 align-items-center">
                  <font-awesome-icon class="text-red" icon="arrow-alt-circle-up"/>
                </div>
                <div class="mr-4 w-100">
                  <h4 class="m-0">Payment</h4>
                  <h6
                    class="m-0 word-break-word"
                  >Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)</h6>
                </div>
                <div class="text-right d-flex align-items-center">
                  <h4 class="m-0">-$200</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row transaction mb-3">
            <div class="col-12">
              <div class="d-flex">
                <div class="icon-wrap d-flex mr-4 align-items-center">
                  <font-awesome-icon class="text-red" icon="arrow-alt-circle-up"/>
                </div>
                <div class="mr-4 w-100">
                  <h4 class="m-0">Payment</h4>
                  <h6
                    class="m-0 word-break-word"
                  >Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)</h6>
                </div>
                <div class="text-right d-flex align-items-center">
                  <h4 class="m-0">-$200</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row transaction mb-3">
            <div class="col-12">
              <div class="d-flex">
                <div class="icon-wrap d-flex mr-4 align-items-center">
                  <font-awesome-icon class="text-green" icon="arrow-alt-circle-down"/>
                </div>
                <div class="mr-4 w-100">
                  <h4 class="m-0">Top-Up</h4>
                  <h6
                    class="m-0 word-break-word"
                  >Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)</h6>
                </div>
                <div class="text-right d-flex align-items-center">
                  <h4 class="m-0">+$200</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row transaction mb-3">
            <div class="col-12">
              <div class="d-flex">
                <div class="icon-wrap d-flex mr-4 align-items-center">
                  <font-awesome-icon class="text-green" icon="arrow-alt-circle-down"/>
                </div>
                <div class="mr-4 w-100">
                  <h4 class="m-0">Top-Up</h4>
                  <h6
                    class="m-0 word-break-word"
                  >Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)</h6>
                </div>
                <div class="text-right d-flex align-items-center">
                  <h4 class="m-0">+$200</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row transaction mb-3">
            <div class="col-12">
              <div class="d-flex">
                <div class="icon-wrap d-flex mr-4 align-items-center">
                  <font-awesome-icon class="text-green" icon="arrow-alt-circle-down"/>
                </div>
                <div class="mr-4 w-100">
                  <h4 class="m-0">Top-Up</h4>
                  <h6
                    class="m-0 word-break-word"
                  >Fin: FAEFVQ$532TWETW$TERYWeSGRGTHERSHEWRHWEWER523452 SDGAEG(TxnId:5234623463) (320.0EUR)</h6>
                </div>
                <div class="text-right d-flex align-items-center">
                  <h4 class="m-0">+$200</h4>
                </div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ACard from "../components/cards/ACard";
import ATransaction from "../components/cards/ATransaction";

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
          amount: "+$200"
        },
        {
          isPositive: false,
          type: "Payment",
          amount: "-$200"
        },
        {
          isPositive: false,
          type: "Payment",
          amount: "-$200"
        },
        {
          isPositive: true,
          type: "Top-Up",
          amount: "+$250"
        },
        {
          isPositive: true,
          type: "Top-Up",
          amount: "+$1700"
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
.transactions-list {
}
.transaction {
  cursor: pointer;
  padding: 18px 10px;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.transaction:hover {
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.25), 0 8px 8px rgba(0, 0, 0, 0.22);
}
.icon-wrap {
  font-size: 24px;
}
</style>