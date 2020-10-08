import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


//Main COntainer
import MainContainer from '../container/MainCOntainer';
import Details from '../views/Details'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: MainContainer,
        children: [{
            path: '/',
            component: Home

        }, {
            path: '/details',
            component: Details

        }]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router