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
        <div class="col-md-6">
          <form class="my-form">
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped>
.my-form {
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