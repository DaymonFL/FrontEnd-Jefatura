/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   extendRoutes: setupLayouts,
// })

// export default router

// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(importprocess.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: ()=> import('@/views/InicioLogin.vue'),
    },
    {
      path:'/admin',
      name: 'admin',
      component: () => import('@/views/UsuarioCentral.vue'),
      props:{ name:'Central'},
      meta: {requiresAuth: true},
      children:[
        {
          path: '/nuevo',
          name: 'Nuevo',
          component: () => import('@/components/NuevoUsuario.vue'),
        },
        {
          path: '/seguimiento',
          name: 'Seguimiento',
          component: () => import('@/components/Seguimiento.vue'),
        }
      ]
    },
    {
      path:'/distrital',
      name: 'Distrital',
      component: () => import('@/views/UsuarioDistrital.vue'),
      meta: {requiresAuth: true},
      props:{ name:'Distrital'},
      // children:[
      //   {
      //     path: '/seguimiento-representaciones',
      //     name: 'SeguimientoRepresentaciones',
      //     component: () => import('@/components/SeguimientoRepresentaciones.vue'),
      //   }
      // ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.jwt;
  if( to.matched.some((record) => record.meta.requiresAuth) ){
    if( !token ){
      next({name: 'Login'});
    }else {
      next();
    }
  } else {
    next();
  }
})
export default router

