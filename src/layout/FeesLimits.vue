<template>
  <div class="dashboard-finance">
    <div class="container-fluid dashboard-content">
      <h2 class="mb-4">Fees & Limits</h2>
      <div class="row">
        <div class="col-11 mx-auto mt-2 mb-4">
          <h3 class="text-center">Fees</h3>
          <table class="table bg-white">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Email</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody class="text-grey">
              <tr>
                <td>John</td>
                <td>john@example.com</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>mary@example.com</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>July</td>
                <td>july@example.com</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-11 mx-auto mt-4">
          <h3 class="text-center">Limits</h3>
          <table class="table bg-white">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody class="text-grey">
              <tr>
                <td>John</td>
                <td>john@example.com</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>mary@example.com</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>July</td>
                <td>july@example.com</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
            </tbody>
          </table>
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
      limits: []
    };
  },
  mounted() {
    axios
      .get(`${baseURL}/api/client/fees`)
      .then(({ data }) => {
        this.fees = data.fees;
        this.limits = data.limits;
      })
      .catch(console.log);
  }
};
</script>

<style scoped>
</style>