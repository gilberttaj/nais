<!-- src/views/AuthValidation.vue -->
<template>
  <div class="auth-validation">
    <div v-if="isLoading" class="loading-container">
      <div class="spinner-container">
        <LoadingSpinner :size="35" />
        <div class="authenticating-text">Authenticating...</div>
      </div>
    </div>
    <div v-else-if="error" class="error-container">
      <h2>Authentication Error</h2>
      <p>{{ error }}</p>
      <button @click="goToLogin">Return to Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LoadingSpinner from '@/components/atoms/LoadingSpinner.vue'
import ls from '@/utils/secureLS'
import { useAuth } from '../../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { handleGoogleCallback, isLoading, error } = useAuth()






// Function to navigate to login page
const goToLogin = () => {
  ls.remove('id_token')
  ls.remove('access_token')
  ls.remove('refresh_token')
  ls.remove('token_type')
  ls.remove('token_expiration')
  router.push('/signin')
}

onMounted(async () => {
  try {
    const code = route.query.code
    
    if (!code) {
      throw new Error('No authorization code received')
    }
    
    await handleGoogleCallback(code)
    
    // Redirect to dashboard after successful authentication
    setTimeout(() => {
      router.push('/')
    }, 1500)
    
  } catch (err) {
    console.error('Authentication callback error:', err)
  }
})

</script>

<style scoped lang="postcss">
.auth-validation {
  @apply flex justify-center items-center min-h-screen text-center bg-gray-50;
}

.loading-container {
  @apply flex flex-col items-center justify-center;
}

.spinner-container {
  @apply flex flex-col items-center justify-center p-8 rounded-lg bg-white shadow-md w-[250px] h-[150px] mb-4;
}

.authenticating-text {
  @apply text-base text-gray-600 font-medium;
}

.error-container {
  @apply p-8 rounded-lg shadow-md bg-white max-w-md text-red-600;
}

button {
  @apply mt-6 py-3 px-6 bg-blue-500 text-white border-none rounded-md cursor-pointer font-medium transition-colors;
}

button:hover {
  @apply bg-blue-600;
}
</style>