import { RouteRecordRaw } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/home/home.vue') },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/map/map.vue'),
  },
  {
    path:'/service',name:'service',component: ()=>import('@/views/other/index.vue')
  },
  {
    path: '/:any(.*)',
    name: 'notFound',
    component: () => import('@/views/404.vue'),
    meta: { guest: true },
  },
] as RouteRecordRaw[]

export default routes
