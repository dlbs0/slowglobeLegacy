import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.name !== 'home') {
      if (savedPosition) {
        return savedPosition
      } else {
        return { left: 0, top: 0 }
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log('savedPosition:', savedPosition)
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ left: 0, top: 0 })
        }
      }, 1000)
    })
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/convert',
      name: 'convert',
      component: () => import('../views/ConversionView.vue')
    },
    {
      path: '/ps',
      name: 'pointSelect',
      component: () => import('../views/PointSelectView.vue')
    },
    {
      path: '/trip/ljusdal',
      name: 'ljusdal',
      component: () => import('../views/trips/TripLjusdal.vue')
    },
    {
      path: '/trip/bracke',
      name: 'bracke',
      component: () => import('../views/trips/TripBracke.vue')
    },
    {
      path: '/trip/gavle',
      name: 'gavle',
      component: () => import('../views/trips/TripGavle.vue')
    },
    {
      path: '/trip/sweden',
      name: 'sweden',
      component: () => import('../views/trips/TripSweden.vue')
    },
    {
      path: '/trip/flinders',
      name: 'flinders',
      component: () => import('../views/trips/TripFlinders.vue')
    }
    // {
    //   path: '/trip/:id',
    //   component: () => import('../components/DetailView.vue')
    // }
  ]
})

export default router
