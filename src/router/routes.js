
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'new', component: () => import('pages/NewFerment.vue') },
      { path: 'ferments', component: () => import('pages/Ferments.vue') },
      { path: 'ferments/:id', component: () => import('pages/FermentData.vue') }

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
