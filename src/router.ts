// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import CallbackPage from './components/CallbackPage.vue';
import HelloWorld from './components/HelloWorld.vue';
import HomePage from './components/HomePage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/callback',
    name: 'Callback',
    component: CallbackPage,
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;