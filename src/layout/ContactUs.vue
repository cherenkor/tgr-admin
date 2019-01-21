<template>
  <div class="dashboard-finance mt-4">
    <div class="container-fluid dashboard-content mt-4">
      <div class="row mt-4">
        <div class="col-md-6">
          <div>
            <img style="width:100%; height: auto" src="../assets/img/map.png" alt>
          </div>
        </div>
        <br>
        <div id="credentials" class="col-md-6">
          <h2 class="mb-4">Contacts</h2>
          <div class="m-3">
            <h3 class="mb-0">Phone, Whatsapp, Telegram:</h3>
            <a id="phone" href="tel:+4402034880005">+44 (0) 203 4880 005</a>
          </div>
          <div class="m-3">
            <h3 class="mb-0">Address:</h3>
            <span
              @click="copyAddress"
              ref="address"
              :class="{ 'text-main': copied }"
              class="pointer"
            >52 Brook Street, London W1K 5DS, UK {{ copied ? '✓' : '' }}</span>
          </div>
          <div class="m-3">
            <h3 class="mb-0">Email:</h3>
            <a id="phone" href="mailto:support@tgrpayments.com">support@tgrpayments.com</a>
          </div>
          <!-- <form class="my-form">
            <h2 class="mt-2 mb-4">Contact Us</h2>
            <div class="form-group">
              <input type="email" class="form-control" id="form-name" placeholder="Name">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="form-subject" placeholder="Subject">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" id="form-email" placeholder="Email">
            </div>
            <div class="form-group">
              <textarea class="form-control" id="form-message" placeholder="Message"></textarea>
            </div>
            <button @click.prevent class="btn btn-primary mt-2" type="submit">Send</button>
          </form>-->
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
span {
  color: #71748d;
  font-size: 1.1rem;
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