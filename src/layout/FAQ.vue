<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <h3>FAQ</h3>
      <spinner class="my-4" v-if="loading"/>
      <div class="row mt-4 mb-4">
        <div v-for="card in faqList" :key="card.question" class="col-11 mx-automb-2">
          <div class="row">
            <div class="col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 my-0">
              <p class="mb-1 text-black">
                <strong>Question:</strong>
              </p>
            </div>
            <div
              class="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-11 my-0 px-sm-5 px-md-4 px-lg-4 px-xl-0"
            >
              <p class="mx-2 mb-1 text-gray">{{ card.question}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 my-0">
              <p class="mb-1 text-black">
                <strong>Answer:</strong>
              </p>
            </div>
            <div
              class="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-11 my-0 px-sm-5 px-md-4 px-lg-4 px-xl-0"
            >
              <p v-html="answerWithLinks(card.answer)" class="mx-2 mb-1 text-gray"></p>
            </div>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/index.js";
const { baseURL } = config;
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default {
  data() {
    return {
      faqList: [],
      loading: true
    };
  },
  mounted() {
    axios
      .get(`${baseURL}/api/client/faq/cards`)
      .then(({ data }) => {
        this.faqList = data.faq_cards;
      })
      .catch(console.log)
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    answerWithLinks(answer) {
      const regEx = /(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/;
      return answer.replace(regEx, '<a href="mailto:$1">$1</a>');
    }
  }
};
</script>

<style scoped>
.text-black {
  color: black;
}
</style>