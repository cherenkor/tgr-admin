<template>
  <div class="modal fade" id="top-up">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Top Up</h4>
        </div>
        <div class="modal-body text-center">
          <div v-for="info in infoList" :key="info" class="info text-left mb-3">
            <h5 class="text-dark mb-1">
              <strong>{{ info }}</strong>
            </h5>
            <h6
              v-for="requisite in Object.keys(topUp[info])"
              :key="JSON.stringify(requisite)"
              class="mb-0 text-grey small-height"
            >
              <strong>{{ requisite }}:</strong>
              {{ topUp[info][requisite] }}
            </h6>
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
      infoList: []
    };
  },
  created() {
    const keys = Object.keys(this.topUp);
    console.log(keys);
    if (keys[0] !== "TGR Corporate Concierge") {
      const index = keys.indexOf("TGR Corporate Concierge");
      this.infoList = this.swap(keys, index, 0);
    } else {
      this.infoList = keys;
    }
  },
  methods: {
    swap(arr, ind1, ind2) {
      [arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
      return arr;
    }
  }
};
</script>

<style scoped>
.small-height {
  line-height: 22px;
}
</style>