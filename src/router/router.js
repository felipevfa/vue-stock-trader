import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Stock from '../components/Stock.vue';
import Portfolio from '../components/Portfolio.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/stocks', component: Stock },
    { path: '/portfolio', component: Portfolio },
    { path: '*', component: Home }
];

export const router = new VueRouter({
    routes
});