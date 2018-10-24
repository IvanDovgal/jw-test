import VueRouter from 'vue-router';

function view(name) {
  return () => import(`../pages/${name}.vue`);
}

const routes = [
  { path: '/bookshelf/:user/shelf/:shelf', component: view('Bookshelf'), name: 'user-bookshelf-shelf' },
  { path: '/bookshelf/:user', component: view('Bookshelf'), name: 'user-bookshelf' },
  { path: '/page2', component: view('Page2'), name: 'r1' },
];


// eslint-disable-next-line import/prefer-default-export
export const createRouter = () => new VueRouter({
  mode: 'history',
  routes,
});
