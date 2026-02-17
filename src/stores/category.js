import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import api from "@/api/http";
export const useCategoryStore = defineStore("category", () => {
    // State management
    let categories = ref([]);
    let isLoading = ref(false);
    let pagination = reactive({
        currentPage: 1,
        itemPerPage: 10,
        totalItems: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: true
    })

    // Action
    async function fetchCategory(page, per_page) {
        isLoading.value = true
        let res = await api.get(`/categories?_page=${page}&_per_page=${per_page}`);
        categories.value = res.data.data.items;
        pagination.totalItems = res.data.data.meta.totalItems;
        pagination.totalPages = res.data.data.meta.totalPages;
        pagination.currentPage = res.data.data.meta.currentPage;
        isLoading.value = false;


    }
    // Return
    return { fetchCategory, categories, pagination ,isLoading}

})