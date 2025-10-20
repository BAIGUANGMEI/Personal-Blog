import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'aboutme',
        component: () => import('@/views/AboutMe.vue'),
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('@/views/Timeline.vue'),
    },
    {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/Blog.vue'),
    },
    {
        path: '/blog/:slug',
        name: 'blogpreview',
        component: () => import('@/views/BlogPreview.vue'),
    },
    {
        path: '/bulletinboard',
        name: 'bulletinboard',
        component: () => import('@/views/BulletinBoard.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router