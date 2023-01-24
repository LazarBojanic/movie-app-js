<template>
 <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
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
                        <button type="submit" class="btn btn-primary">Register</button>
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
        errors: {}
      }
    },
    methods: {
      register() {
        const schema = Joi.object({
          email: Joi.string().required(),
          username: Joi.string().required(),
          pass: Joi.string().required()
        })
  
        const validation = schema.validate({
          email: this.email,
          username: this.username,
          pass: this.pass
        })
  
        if (validation.error) {
          this.errors = validation.error.details.reduce((errors, error) => {
            errors[error.path[0]] = error.message
            return errors
          }, {})
          return
        }
  
        // Send a POST request to the server with the user's email, username, and password
        fetch('http://localhost:8500/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            username: this.username,
            pass: this.pass,
            userRole: 'client'
          })
        })
          .then(res => res.json())
          .then(res => {
            if (res.error) {
              console.error(res.error)
            } else {
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
         
  