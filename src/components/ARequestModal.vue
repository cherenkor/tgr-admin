<template>
  <div class="modal" id="request">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Online Payment</h4>
        </div>
        <div class="modal-body text-center">
          <div v-if="showSuccessDialog" class="request-dialog mt-2">
            <h5>Request sent</h5>
          </div>
          <div v-else class="success-dialog mt-2">
            <h5>Please click request button and your manager will contact you to confirm the online payments are ON</h5>
          </div>
          <div class="d-flex justify-content-center">
            <div
              :class="{ 'justify-center': showSuccessDialog }"
              class="d-flex justify-content-between w-80"
            >
              <button
                @click="showSuccessDialog = false"
                id="close"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >Close</button>
              <button
                v-if="!showSuccessDialog"
                @click="localSendRequest"
                id="request"
                type="button"
                class="btn btn-primary"
              >Request</button>
            </div>
          </div>
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
      showSuccessDialog: false
    };
  },
  created() {
    $("#request").on("hidden.bs.modal", () => {
      this.showSuccessDialog = false;
    });
  },
  methods: {
    ...mapActions("cards", ["sendRequest"]),
    localSendRequest() {
      this.sendRequest(this.cardId).then(success => {
        if (success) this.showSuccessDialog = true;
      });
    }
  }
};
</script>

<style scoped>
.w-80 {
  width: 80%;
}
.justify-center {
  justify-content: center !important;
}
</style>