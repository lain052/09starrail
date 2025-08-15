// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import UniverseHome from '@/components/UniverseHome.vue'
import Timeline from '@/components/Timeline.vue'
import Factions from '@/components/Factions.vue'
import StarGods from '@/components/StarGods.vue'
import Glossary from '@/components/Glossary.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UniverseHome,
  },
  // 时间线相关路由
  {
    path: '/timeline/:section?',
    name: 'Timeline',
    component: Timeline,
    props: true,
  },
  // 派系相关路由
  {
    path: '/factions/:faction?',
    name: 'Factions',
    component: Factions,
    props: true,
  },
  // 星神相关路由
  {
    path: '/stargods/:god?',
    name: 'StarGods',
    component: StarGods,
    props: true,
  },
  // 名词解释相关路由
  {
    path: '/glossary/:term?',
    name: 'Glossary',
    component: Glossary,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
