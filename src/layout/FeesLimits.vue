<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <h2 class="mb-4">Fees & Limits</h2>
      <spinner class="my-4" v-if="loading"/>
      <div class="row">
        <div class="col-12 mx-auto mt-2 mb-4">
          <h3 class="text-center">Fees</h3>
          <div>
            <table v-if="fees.length" class="table table-bordered bg-white">
              <thead class="thead-light">
                <tr>
                  <th></th>
                  <th></th>
                  <th>USD</th>
                  <th>EUR</th>
                  <th>GBP</th>
                </tr>
              </thead>
              <tbody class="text-dark">
                <tr v-for="(fee, i) in fees" :key="i">
                  <td>{{ fee.name }}</td>
                  <td>{{ fee.scope }}</td>
                  <td>{{ fee.usd }}</td>
                  <td>{{ fee.eur }}</td>
                  <td>{{ fee.gbp }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 mx-auto mt-2 mb-4">
          <h3 class="text-center">Limits</h3>
          <div>
            <table v-if="limits.length" class="table table-bordered bg-white">
              <thead class="thead-light">
                <tr>
                  <th class="w-50"></th>
                  <th class="w-14"></th>
                  <th>USD</th>
                  <th>EUR</th>
                  <th>GBP</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <table v-for="(limit, i) in limits" :key="i" class="table table-bordered bg-white">
              <thead>
                <tr>
                  <th class="text-center" colspan="6">{{ limit.section }}</th>
                </tr>
              </thead>
              <tbody v-for="(row, j) in limit.rows" :key="j" class="text-dark">
                <tr>
                  <td class="w-50">{{ row.name }}</td>
                  <td class="w-14">{{ row.scope }}</td>
                  <td>{{ row.usd }}</td>
                  <td>{{ row.eur }}</td>
                  <td>{{ row.gbp }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
      fees: [],
      limits: [],
      loading: true
    };
  },
  mounted() {
    axios
      .get(`${baseURL}/api/client/fees`)
      .then(({ data }) => {
        this.fees = data.fees;
        this.limits = data.limits;
      })
      .catch(console.log)
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style scoped>
@media only screen and (max-width: 976px) {
  table {
    font-size: 1.2vw;
  }
}

@media only screen and (max-width: 768px) {
  table {
    font-size: 1.4vw;
  }
}

@media only screen and (max-width: 460px) {
  table {
    font-size: 2.8vw;
  }
}
.w-14 {
  width: 14%;
}
</style>