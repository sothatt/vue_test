<template>
    <div>
        <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-5">
                        <div class="card shadow-sm border-0">
                            <div class="card-body p-5">
                                <h2 class="fw-bold mb-4 text-center">Login</h2>
                                <form @submit.prevent="handleLogin">
                                    <div class="mb-3">
                                        <label for="emailInput" class="form-label">Email address</label>
                                        <input v-model="email" type="email" class="form-control" id="emailInput"
                                            placeholder="name@example.com" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="passwordInput" class="form-label">Password</label>
                                        <input v-model="password" type="password" class="form-control"
                                            id="passwordInput" required>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        <a href="#" class="text-decoration-none small">Forgot password?</a>
                                    </div>

                                    <div class="d-grid">
                                        <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
                                    </div>

                                    <p class="text-center mt-4 mb-0">Don't have an account? <a href="#"
                                            class="text-decoration-none">Sign Up</a></p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'
import router from '@/router';

</script>