import api from "@/api/http";
import { reactive, ref } from "vue";

export const useArticleStore =
  ("article",
    () => {
      let articles = ref([]);
      let ownArticles = ref([]);
      let pagination = reactive({
            currentPage: 1,
            itemPerPage: 10,
            totalItems: 0,
            totalPages: 0,
            hasPreviousPage: false,
            hasNextPage: true
      })

      async function fetchAritcles() {
        let res = await api.get("/articles");
        articles.value = res.data.data.items;
      }
      async function fetchOwnAritcles(page, per_page) {
        try {
          let res = await api.get(`/articles/own/?_page=${page}&_per_page=${per_page}`);
          ownArticles.value = res.data.data.items;
          pagination.totalItems = res.data.data.meta.totalItems;
          pagination.totalPages = res.data.data.meta.totalPages;
          pagination.currentPage = res.data.data.meta.currentPage;
          
        } catch (err) {
          console.error(err)
        }
      }

      return { articles, ownArticles, pagination, fetchAritcles, fetchOwnAritcles };
    }); 
