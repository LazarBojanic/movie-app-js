<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label>Email:</label>
                <input class="form-control" type="text" v-model="email" />
              </div>
              <div class="form-group">
                <label>Pass:</label>
                <input class="form-control" type="password" v-model="pass" />
              </div>
              <button class="btn btn-primary" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    async submitForm() {
      const res = await fetch("http://localhost:8500/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          pass: this.pass,
        }),
      });
      const data = await res.json();
      if (data.token) {
        Cookies.set('token', data.token);
        this.$router.push({ name: 'browseFilms' });
      }
    },
  },
};
</script>