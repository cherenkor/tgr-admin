<template>
  <div class="modal" id="pin">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Security</h3>
        </div>
        <div class="modal-body text-center">
          <h4>Your pin code is:</h4>
          <h4>
            <b>{{ pinCode }}</b>
          </h4>
          <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    cardId: {
      required: true
    }
  },
  data() {
    return {
      pinCode: "••••"
    };
  },
  created() {
    this.getPin();
    let timeout;
    $("#pin").on("shown.bs.modal", function() {
      timeout = setTimeout(function() {
        $("#pin").click();
      }, 20000);
    });
    $("#pin").on("hidden.bs.modal", function() {
      clearTimeout(timeout);
    });
  },
  methods: {
    ...mapActions("cards", ["loadPin"]),
    getPin() {
      this.loadPin(this.cardId).then(pin => (this.pinCode = pin));
    }
  }
};
</script>

<style scoped>
</style>