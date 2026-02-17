import api from "@/api/http";
import router from "@/router";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useAuthStore = defineStore('auth', () => {
    let user = ref(null);
    let token = ref(localStorage.getItem('token'));
    let isLoggedIn = computed(() => !!token.value)
    console.log(isLoggedIn);
    
    async function login(email, password){
        try {
            const res = await api.post('/auth/login', {email, password});
            user.value = res.data.data.user;
            token.value = res.data.data.token;
            localStorage.setItem('token', token.value);
        } catch (error) {
            throw error.response
        }
    }

    async function logout() {
        let res = await api.delete('/auth/logout');
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
        router.push('/login')
    }

    return { user, token, isLoggedIn, login, logout}

})