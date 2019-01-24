<template>
  <div class="modal fade" id="top-up">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Top Up</h4>
        </div>
        <div class="modal-body text-center">
          <div v-for="info in infoList" :key="info" class="info text-left">
            <h5 class="text-dark mb-0">
              <strong>{{ info }}:</strong>
            </h5>
            <h5 class="mb-2 text-grey small-height">{{ topUp[info] }}</h5>
          </div>
          <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { map } from "lodash";

export default {
  props: {
    topUp: {
      required: true
    }
  },
  data() {
    return {
      infoList: [
        "Account Name",
        "Account number",
        "Beneficiary Bank",
        "Company Address",
        "IBAN",
        "Payment details",
        "SWIFT",
        "Sort code"
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.small-height {
  line-height: 16px;
}
</style>