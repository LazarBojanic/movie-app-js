<template>
 <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div>
                <form @submit.prevent="register" class="needs-validation" novalidate>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" v-model="email" class="form-control" required />
                        <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                    </div>
                        <div class="form-group">
                        <label>Username</label>
                        <input type="text" v-model="username" class="form-control" required />
                            <div class="invalid-feedback" v-if="errors.username">{{ errors.username }}</div>
                    </div>
                        <div class="form-group">
                        <label>Password</label>
                        <input type="password" v-model="pass" class="form-control" required />
                            <div class="invalid-feedback" v-if="errors.pass">{{ errors.pass }}</div>
                    </div>
                    <br/>
                        <button type="submit" class="btn btn-primary">Register</button>
                        <br/>
                        <div v-if="errorMessage" class="alert alert-danger">{{errorMessage}}</div>
                </form>
            </div>
          </div>
            <div class="card-footer text-center">
                Already have an account? <router-link to="/login">Login</router-link>
             </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import Joi from 'joi-browser'
  
  export default {
    data() {
      return {
        email: '',
        username: '',
        pass: '',
        errors: {},
        errorMessage: ""
      }
    },
    methods: {
      register() {

        const registerData = {
          email: this.email,
          username: this.username,
          pass: this.pass,
          userRole: 'client'
        }

        const schema = Joi.object({
          email: Joi.string().required(),
          username: Joi.string().required(),
          pass: Joi.string().required().min(5)
        })
  
        const { error }  = schema.validate({ email: registerData.email, username: registerData.username, pass: registerData.pass})
  
        if (error) {
          this.errorMessage = error.details[0].message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
          return;
        }

        fetch('http://94.189.193.50:8500/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
        })
          .then(res => res.json())
          .then(res => {
            if (res.error) {
              console.error(res.error)
            } else {
              console.log(registerData);
              console.log('User registered!')
            }})
        .catch(err => console.error(err))
            }
        }
}
</script>

<style>
.needs-validation {
  margin-bottom: 1rem;
}
</style>
         
  