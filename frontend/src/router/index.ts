import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'VALORY',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/editor',
      name: 'Editor',
      component: () => import('@/views/EditorView.vue'),
    },
    {
      path: '/overlay/:overlayID',
      name: 'Overlay',
      component: () => import('@/views/OverlayView.vue'),
      props: (route) => ({ overlayID: route.params.overlayID }),
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/TestView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Ooops! 404',
      component: () => import('@/views/PageNotFoundView.vue'),
      meta: { hideHighlight: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})

export default router
