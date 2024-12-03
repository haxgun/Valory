import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/EditorView.vue')
    },
    {
      path: '/overlay/:overlayID',
      name: 'overlay',
      component: () => import('@/views/OverlayView.vue'),
      props: true
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/PageNotFoundView.vue')
    }
  ]
})

export default router
