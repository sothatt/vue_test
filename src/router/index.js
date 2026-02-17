import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import ArticleView from '@/views/ArticleView.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import UpdateArticle from '@/views/UpdateArticle.vue'
import detailArticle from '@/views/detailArticle.vue'
import categoryView from '@/views/categoryView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta : {require : true}
    },
    
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView,
      meta : {require : true}
    },
    {
      path: '/article/:id',
      name: 'articledetail',
      component: detailArticle,
      meta : {require : true
      }
    },
    {
      path: '/article/create',
      name: 'createArticle',
      component: CreateArticle,
      meta : {require : true}
    },
     {
      path: '/article/update/:id',
      name: 'updateArticle',
      component: UpdateArticle,
      meta : {require : true}
    },
    {
      path:'/category',
      name:'category',
      component:categoryView
    }
  ],
})

router.beforeEach((to, from) => {
  let auth = useAuthStore();

  if(!auth.isLoggedIn && to.meta.require){
    return {name : 'login'}
  }

  return true;
})

export default router
