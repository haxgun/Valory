import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/EditorView.vue'),
  },
  {
    path: '/overlay/:overlayID',
    name: 'overlay',
    component: () => import('@/views/OverlayView.vue'),
    props: (route) => ({ overlayID: route.params.overlayID }),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/PageNotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
