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
              <br/>
              <button class="btn btn-primary" type="submit">Login</button>
              <br/>
              <div v-if="errorMessage" class="alert alert-danger">{{errorMessage}}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Joi from 'joi-browser'
export default {
  data() {
    return {
      email: "",
      pass: "",
      errorMessage: ""
    };
  },
  methods: {
    async submitForm() {

      const loginData = {
          email: this.email,
          pass: this.pass,
         }


        const schema = Joi.object({
          email: Joi.string().required(),
          pass: Joi.string().required()
        });
        const { error } = schema.validate({email: loginData.email, pass: loginData.pass});
        if (error) {
          this.errorMessage = error.details[0].message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
          return;
        }

      const res = await fetch("http://94.189.193.50:8500/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.token) {
        Cookies.set('token', data.token);
        this.$emit('loginSuccess', data.token);
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>