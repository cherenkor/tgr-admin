<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <div class="row">
        <!-- <div class="col-md-6">
          <div>
            <img style="width:100%; height: auto" src="../assets/img/map.png" alt>
          </div>
        </div>
        <br>-->
        <div id="credentials" class="col-md-6">
          <h3 class="mb-4">Contacts</h3>
          <div class="m-3">
            <h5 class="mb-0">Landline:</h5>
            <a id="phone" href="tel:+442034882840">+44 203 488 2840</a>
          </div>
          <div class="m-3">
            <h5 class="mb-0">Whats app us:</h5>
            <a id="phone" href="tel:+447474466625">+44 747 446 6625</a>
          </div>
          <div class="m-3">
            <h5 class="mb-0">Address:</h5>
            <span
              @click="copyAddress"
              ref="address"
              :class="{ 'text-main': copied }"
              class="pointer"
            >33-34 Alfred Place, Fitzrovia, WC1E 7DP, London, UK {{ copied ? '✓' : '' }}</span>
          </div>
          <div class="m-3">
            <h5 class="mb-0">Email:</h5>
            <a id="phone" href="mailto:support@tgr.cards">support@tgr.cards</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      copied: false
    };
  },
  methods: {
    copyAddress() {
      this.selectText(this.$refs.address);
      document.execCommand("copy");
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 5000);
    },
    selectText(element) {
      const range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  }
};
</script>

<style scoped>
.my-form {
  color: #2f9483;
  font-size: 1.1rem;
}
span,
a {
  color: #71748d;
  font-size: 14px !important;
}
.text-main {
  color: #2f9483;
}
.my-form .btn-default {
  background-color: #2f9483;
  color: #fff;
  border-radius: 0;
}
.my-form .btn-default:hover {
  background-color: black;
  color: #fff;
}
.my-form .form-control {
  border-radius: 0;
}

#phone {
  font-size: 1.1rem;
}

input::placeholder,
textarea::placeholder {
  color: #71748d !important;
}

input,
input:focus,
textarea,
textarea:focus {
  color: #3a3a3a !important;
  box-shadow: none;
}
</style>