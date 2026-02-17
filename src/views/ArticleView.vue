<template>
  <div>
    <!-- Top Navbar -->
    <Navbar></Navbar>
    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar></Sidebar>
      <!-- Main Content -->
      <div class=" content w-100">
        <h3>Article Page</h3>
        <div class="d-flex justify-content-end my-4">
          <router-link class="btn bg-primary text-light " :to="{name:'createArticle'}">
           Add Article
          </router-link>
        </div>
        <BaseTable :columns="columns" :rows="articleStore.ownArticles.value" @delete="handleDelete" @edit = "gotoEdit">
          <template #col-thumbnail="{ value }" >
            <img :src="value" alt="" width="50px" class="">
          </template>
          <template #col-category="{ value }">
            <p v-if="value?.name">{{ value?.name}}</p>
            <p v-else>null</p>
          </template>
        </BaseTable>
        <BasePagination 
        :totalPages = articleStore.pagination.totalPages 
        :current = articleStore.pagination.currentPage
        @update:page = handleNexPage 
        ></BasePagination>
      </div>
    </div>
  </div>
</template>
<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import Navbar from '@/components/layout/Navbar.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import { useArticleStore } from '@/stores/articles';
import { onMounted, ref } from 'vue';
import BaseTable from '@/components/ui/BaseTable.vue';
import api from '@/api/http';
import { useRouter } from 'vue-router';
const router = useRouter();
let articleStore = useArticleStore();
let per_page = ref(10)
onMounted(async () => {
  await articleStore.fetchOwnAritcles(1, per_page.value);
})
let columns = [
  { label: "Id", key: "id" },
  { label: "Title", key: "title" },
  { label: "Content", key: "content" },
  { label: "Thumbnail", key: "thumbnail" },
  { label: "Category", key: "category" },
]
const handleDelete = async (id)=>{
  await api.delete('/articles/'+id);
  await articleStore.fetchOwnAritcles(1, per_page.value);
}
const gotoEdit = (id)=>{
  router.push(`/article/update/${id}`);

}
const handleNexPage = async (page) =>{
  await articleStore.fetchOwnAritcles(page, per_page.value);
}

</script>