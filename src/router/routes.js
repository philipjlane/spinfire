
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { requiresAuth: true } },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'logout', component: () => import('pages/Logout.vue') },
      { path: 'new', component: () => import('pages/NewFerment.vue'), meta: { requiresAuth: true } },
      { path: 'ferments', component: () => import('pages/Ferments.vue'), meta: { requiresAuth: true } },
      { path: 'ferments/:user/:id', component: () => import('pages/FermentData.vue'), meta: { requiresAuth: true } }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
