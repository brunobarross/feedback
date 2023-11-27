import PageHome from '../pages/PageHome.vue'
import PageNewFeedback from '../pages/PageNewFeedback.vue'
import PageFeedBack from '../pages/PageFeedback.vue'
import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    { name: 'home', path: '/', component: PageHome },
    { name: 'new_feedback', path: '/add', component: PageNewFeedback, meta: { edit: false } },
    { name: 'edit_feedback', path: '/edit/:id', component: PageNewFeedback, meta: { edit: true } },
    { name: 'feedback', path: '/feedback/:id', component: PageFeedBack },


]


export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

