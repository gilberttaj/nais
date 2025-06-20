<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <h2 class="not-found-subtitle">Page Not Found</h2>
      <p class="not-found-message">The page you are looking for doesn't exist or has been moved.</p>
      <Button @click="goHome" variant="primary" class="mt-6">Go to Home</Button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from '@/components/atoms/Button.vue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped lang="postcss">
.not-found-container {
  @apply flex justify-center items-center min-h-screen bg-gray-50;
}

.not-found-content {
  @apply flex flex-col items-center justify-center p-8 rounded-lg bg-white shadow-md max-w-md text-center;
}

.not-found-title {
  @apply text-8xl font-bold text-primary mb-2;
}

.not-found-subtitle {
  @apply text-2xl font-semibold text-gray-700 mb-4;
}

.not-found-message {
  @apply text-gray-600 mb-6;
}
</style>
