import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import indexInsert from './components/IndexInsert.vue';
import indexGenerator from './components/indexGenerator.vue';
import testingPages from './components/TestingPages.vue';
import preparingPages from './components/preparingPages.vue';
import register from './components/Register.vue';
const Login = () => import("./components/Login.vue");
import error404 from './components/error404.vue'
import profile from "./components/Profile.vue";
import about from "./components/About.vue";
import precio from "./components/Precio.vue";
import pago from "./components/Pago.vue";
import store from "./store"; 


const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/indexInsert',
        name: 'indexInsert',
        component: indexInsert,
    },
    {
        path: '/indexGenerator',
        name: 'indexGenerator',
        component: indexGenerator,
    },
    {
        path: '/testingPages',
        name: 'testingPages',
        component: testingPages,
    },
    {
        path: '/preparingPages',
        name: 'preparingPages',
        component: preparingPages,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },{
        path: '/register',
        name: 'register',
        component: register,
    },{
        path: '/error404',
        name: 'error404',
        component: error404,
    },{
        path: '/profile',
        name: 'profile',
        component: profile,
    },{
        path: '/about',
        name: 'about',
        component: about,
    },{
        path: '/precio',
        name: 'precio',
        component: precio,
    },{
        path: '/pago',
        name: 'pago',
        component: pago,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

router.beforeEach(async (to, from, next) => {
    store.dispatch("saveLastPage",from)
    let routesList = ['/pago','/precio','/about','/logout','/profile','/register','/login','/indexInsert','/testingPages','/indexGenerator','/','/error404',"/preparingPages"]
    if (!routesList.includes(to.path)){
        next('/error404')
    }
/*     const publicPages = ['/login',"/register"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.loggedIn; */
    next()
/*     if (!authRequired) {
        next()
    } else if (authRequired && !loggedIn) {
        next('/login');
    }else{
        next()
    } */

});


export default router;
