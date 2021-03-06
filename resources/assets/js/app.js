require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
window.Vue = require('vue');


//Vue.component('example', require('./components/Example.vue'));
let Myheader = require('./components/Myheader.vue');
let Myfooter = require('./components/MyFooter.vue');
let Home = require('./components/Home.vue');
let About = require('./components/About.vue');

const routes = [
	{path: '/home', component: Home},
	{path: '/about', component: About}
]

const router = new VueRouter({
	// mode: 'history',
  	routes // short for `routes: routes`
})
const app = new Vue({
    el: '#app',
    router,
    components: {Myheader,Myfooter}
});
