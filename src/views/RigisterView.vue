<template>
<section class="vh-100 d-flex align-items-center justify-content-center bg-light">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <div class="card shadow-sm border-0">
          <div class="card-body p-5">
            <h2 class="fw-bold mb-4 text-center">Sign UP</h2>
            
            <form @submit.prevent="handleSignup">
              <div class="mb-3">
                <label for="firstNameInput" class="form-label" >First Name</label>
                <input v-model="firstName" type="text" class="form-control" id="firstNameInput" placeholder="first Name" required>
                {{ firstName }}
              </div>
              <div class="mb-3">
                <label for="lastnameInput" class="form-label" >Last Name</label>
                <input v-model="lastName" type="text" class="form-control" id="lastnameInput" placeholder="Last Name" required>
              </div>
              <div class="mb-3">
                <label for="emailInput" class="form-label" >Email address</label>
                <input v-model="email" type="email" class="form-control" id="emailInput" placeholder="name@example.com" required>
              </div>

              <div class="mb-3">
                <label for="passwordInput" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="passwordInput" required placeholder="password">
                {{ password }}
              </div>
              <div class="mb-3">
                <label for="comfirmpasswordInput" class="form-label">Comfirm Password</label>
                <input v-model="confirmpassword" type="password" placeholder="confirmpassword" class="form-control" id="comfirmpasswordInput" required>
                {{ confirmpassword }}
              </div>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                <a href="#" class="text-decoration-none small">Forgot password?</a>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">Create</button>
              </div>
              
              <p class="text-center mt-4 mb-0">Don you have an account? <router-link class="text-decoration-none" to="login">Sign In</router-link></p>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')


async function handleSignup() {
  await auth.register(
    firstName.value,
    lastName.value,
    email.value,
    password.value,
    confirmpassword.value
  )
  router.push('/login')
  

  console.log(firstName.value);
  console.log(lastName.value);
  console.log(email.value);
  console.log(confirmpassword.value);
  
  
}


</script>