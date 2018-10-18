import VueRouter from 'vue-router';
import Page1 from '../components/Page1.vue';
import Page2 from '../components/Page2.vue';

const routes = [
  { path: '/page1', component: Page1, name: 'r1' },
  { path: '/page2', component: Page2, name: 'r2' },
];


// eslint-disable-next-line import/prefer-default-export
export const createRouter = () => new VueRouter({
  mode: 'history',
  routes,
});
