<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <h2>FAQ</h2>
      <div class="row mt-4 mb-4">
        <div v-for="card in faqList" :key="card.question" class="col-11 mx-automb-2">
          <div class="row">
            <div class="col-1">
              <h3 class="my-1">
                <strong>Question:</strong>
              </h3>
            </div>
            <div class="col-11 px-4">
              <h3 class="mx-2 text-gray">{{ card.question}}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <h3 class="my-1">
                <strong>Answer:</strong>
              </h3>
            </div>
            <div class="col-11 px-4">
              <h3 class="mx-2 text-gray">{{ card.answer}}</h3>
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
      faqList: []
    };
  },
  mounted() {
    axios
      .get(`${baseURL}/api/client/faq/cards`)
      .then(({ data }) => {
        this.faqList = data.faq_cards;
      })
      .catch(console.log);
  }
};
</script>

<style scoped>
</style>