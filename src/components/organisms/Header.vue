<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/">
              <div class="text-2xl font-bold text-primary flex items-center">
                <span class="mr-1">NAIS</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </router-link>
          </div>
          <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/" 
              class="border-transparent text-gray-500 hover:border-primary-dark hover:text-primary-dark px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-primary text-primary-dark"
            >
              Home
            </router-link>
            <a href="#" 
              class="border-transparent text-gray-500 hover:border-primary-dark hover:text-primary-dark px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Features
            </a>
            <a href="#" 
              class="border-transparent text-gray-500 hover:border-primary-dark hover:text-primary-dark px-1 pt-1 border-b-2 text-sm font-medium"
            >
              About
            </a>
            <a href="#" 
              class="border-transparent text-gray-500 hover:border-primary-dark hover:text-primary-dark px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Contact
            </a>
          </nav>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
          <router-link 
            to="/signin" 
            v-if="!isLoggedIn" 
            class="text-gray-700 hover:text-primary-dark px-3 py-2 text-sm font-medium"
          >
            Sign In
          </router-link>
          <router-link 
            to="/signup" 
            v-if="!isLoggedIn" 
            class="btn-primary"
          >
            Sign Up
          </router-link>
          <div class="relative" v-else>
            <button 
              @click="isProfileMenuOpen = !isProfileMenuOpen" 
              class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span class="sr-only">Open user menu</span>
              <div class="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                {{ userInitials }}
              </div>
            </button>
            <div 
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </div>
          </div>
        </div>
        <div class="flex items-center sm:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span class="sr-only">Open main menu</span>
            <svg 
              v-if="!isMobileMenuOpen" 
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else 
              class="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isMobileMenuOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link to="/"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-primary-dark hover:text-primary-dark"
          active-class="bg-primary-50 border-primary text-primary"
        >
          Home
        </router-link>
        <a href="#" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-dark hover:text-primary-dark">
          Features
        </a>
        <a href="#" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-dark hover:text-primary-dark">
          About
        </a>
        <a href="#" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-dark hover:text-primary-dark">
          Contact
        </a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4" v-if="isLoggedIn">
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
              {{ userInitials }}
            </div>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
            <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1" v-if="isLoggedIn">
          <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-primary-dark hover:bg-gray-100">
            Your Profile
          </a>
          <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-primary-dark hover:bg-gray-100">
            Settings
          </a>
          <a href="#" @click.prevent="logout" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-primary-dark hover:bg-gray-100">
            Sign out
          </a>
        </div>
        <div class="mt-3 space-y-1" v-else>
          <router-link to="/signin" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-primary-dark hover:bg-gray-100">
            Sign In
          </router-link>
          <router-link to="/signup" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-primary-dark hover:bg-gray-100">
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const isMobileMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);
const isLoggedIn = ref(false);
const user = reactive({
  name: 'John Doe',
  email: 'john@example.com'
});

const userInitials = computed(() => {
  if (!user.name) return '';
  return user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
});

function logout() {
  // Logout logic would go here
  console.log('Logging out');
  isProfileMenuOpen.value = false;
}

const route = useRoute();
watch(() => route.path, () => {
  // Close mobile menu when route changes
  isMobileMenuOpen.value = false;
});
</script>
