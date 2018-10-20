import VueRouter from 'vue-router';

function view(name) {
  return () => import(`../pages/${name}.vue`);
}

const routes = [
  { path: '/page1', component: view('Page1'), name: 'r2' },
  { path: '/page2', component: view('Page2'), name: 'r1' },
];


// eslint-disable-next-line import/prefer-default-export
export const createRouter = () => new VueRouter({
  mode: 'history',
  routes,
});
