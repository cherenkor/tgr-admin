<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <h3 class="mb-4">Fees & Limits</h3>
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
                  <th class="text-center">USD</th>
                  <th class="text-center">EUR</th>
                  <th class="text-center">GBP</th>
                </tr>
              </thead>
              <tbody class="text-dark">
                <tr v-for="(fee, i) in fees" :key="i">
                  <td>{{ fee.name }}</td>
                  <td class="text-center">{{ fee.scope }}</td>
                  <td class="text-center">{{ fee.usd }}</td>
                  <td class="text-center">{{ fee.eur }}</td>
                  <td class="text-center">{{ fee.gbp }}</td>
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
                  <th class="w-25"></th>
                  <th class="w-25"></th>
                  <th class="text-center">USD</th>
                  <th class="text-center">EUR</th>
                  <th class="text-center">GBP</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <table v-for="(limit, i) in limits" :key="i" class="table table-bordered bg-white">
              <thead>
                <tr>
                  <th class="text-center w-50" colspan="5">{{ limit.section }}</th>
                </tr>
              </thead>
              <tbody v-for="(row, j) in limit.rows" :key="j" class="text-dark">
                <tr>
                  <td class="w-25">{{ row.name }}</td>
                  <td class="text-center w-25">{{ row.scope }}</td>
                  <td class="text-center">{{ row.usd }}</td>
                  <td class="text-center">{{ row.eur }}</td>
                  <td class="text-center">{{ row.gbp }}</td>
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
.w-40 {
  width: 40%;
}
.w-35 {
  width: 35%;
}
.w-20 {
  width: 20%;
}
.w-12 {
  width: 12%;
}
</style>