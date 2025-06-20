import { createRouter, createWebHistory } from 'vue-router'
import ls from '../utils/secureLS'
import AuthValidation from '../components/organisms/AuthValidation.vue'
import HomePage from '../pages/HomePage.vue'
import SignInPage from '../pages/SignInPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInPage
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpPage
  },
  {
    path: '/auth/validation',
    name: 'AuthValidation',
    component: AuthValidation,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const accessToken = ls.get('access_token')
  
  console.log('Navigation to:', to.name, 'Has token:', accessToken !== null)
  
  // Case 1: User has NO token
  if (!accessToken) {
    // Allow signin and signup
    if (to.name === 'SignIn' || to.name === 'SignUp' || to.name === 'AuthValidation') {
      console.log('Allowing access to auth page')
      next()
    }
    // Block home and other protected routes
    else if (to.name === 'Home' || to.meta?.requiresAuth) {
      console.log('Blocking protected route, redirecting to signin')
      next('/signin')
    }
    else {
      next()
    }
  }
  // Case 2: User HAS token
  else {
    // Block signin and signup
    if (to.name === 'SignIn' || to.name === 'SignUp' || to.name === 'AuthValidation') {
      console.log('User has token, redirecting to home')
      next('/') 
    }
    // Allow everything else
    else {
      console.log('User has token, allowing navigation')
      next()
    }
  }
})

export default router