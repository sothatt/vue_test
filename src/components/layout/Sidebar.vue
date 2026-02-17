<template>
    <div class="sidebar p-3 px-5">
        <h5 class="text-white mb-4">Admin SY</h5>
        <router-link :to="{name:'home'}">Dashboard</router-link>
        <router-link :to="{name:'article'}">Article</router-link>
        <router-link :to="{name:'category'}">Category</router-link>
        <hr class="border-secondary" />
        <a href="#" @click="handleLogout"><i class="bi bi-box-arrow-left me-2"></i> Logout</a>
      </div>
</template>
<script setup>
  import { useAuthStore } from '@/stores/auth'

  let auth = useAuthStore()

  async function handleLogout(){
      auth.logout();
   }
</script>