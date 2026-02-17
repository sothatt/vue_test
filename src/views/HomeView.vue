<template>
  <!-- Top Navbar -->
    <Navbar></Navbar>

    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar></Sidebar>

      <!-- Main Content -->
      <div class="flex-grow-1 content">
        <!-- Page Title -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold">Article List</h3>
          <button class="btn btn-primary rounded-pill">
            <i class="bi bi-plus-lg"></i> New Article
          </button>
        </div>

   
        <!-- Article Cards -->
        <div class="row g-4">
          <!-- {{ articleStore.articles }} -->
          <BaseCard  :articles ="articleStore.articles.value"></BaseCard>
        </div>
      </div>
    </div>
</template>
<script setup>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import {useArticleStore} from "@/stores/articles";
import BaseCard from '@/components/ui/BaseCard.vue';
import { onMounted } from 'vue';
let articleStore = useArticleStore();
onMounted( async() =>{
  await articleStore.fetchAritcles();
  console.log(articleStore.articles);
  
})

</script>