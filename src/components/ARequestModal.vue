<template>
  <div class="modal" id="request">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Online Payment</h4>
        </div>
        <div class="modal-body text-center">
          <div v-if="showSuccessDialog" class="request-dialog mt-2">
            <h4>Success!</h4>
            <p class="text-grey mb-4">
              It is a long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point of
              using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
              as opposed to using 'Content here, content here', making it look like readable English.
              Many desktop publishing packages and web page editors now use Lorem Ipsum
              as their default model text, and a search for 'lorem ipsum' will uncover many
              web sites still in their infancy. Various versions have evolved over the years,
              sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>
          <div v-else class="success-dialog mt-2">
            <h4>Click 'Request' & wait 30 minutes!</h4>
            <p class="text-grey mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
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