import { createRouter, createWebHistory } from 'vue-router'
import ArticleListView from '../views/ArticleListView.vue'
import FavouriteArticlesView from '../views/FavouriteArticlesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'articleList',
      component: ArticleListView
    },
    {
      path: '/article/:id',
      name: 'articleDescription',
      component: () => import('../views/ArticleDescriptionView.vue'),
    },
    {
      path: '/mesarticles',
      name: 'favouriteArticles',
      component: FavouriteArticlesView
    }
  ]
})

export default router
