<template>
  <div class="signin-container">
    <!-- Left side - Form content -->
    <div class="form-container">
      <div class="form-content">
        <div>
          <h1 class="page-title">Sign In</h1>
          <p class="page-subtitle">
            Enter your email and password to sign in!
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
    
    <!-- Right side - Brand/Logo -->
    <div class="brand-container">
      <div class="brand-content">
        <div class="brand-title">NAIS</div>
        <div class="brand-subtitle">メールマスター</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SignInForm from '@/components/organisms/SignInForm.vue'
</script>

<style scoped lang="postcss">
.signin-container {
  @apply min-h-screen w-full flex;
}

.form-container {
  @apply w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8;
}

.form-content {
  @apply w-full max-w-md space-y-8;
}

.page-title {
  @apply text-3xl font-bold text-gray-900;
}

.page-subtitle {
  @apply mt-2 text-sm text-gray-600;
}

.brand-container {
  @apply hidden lg:block lg:w-1/2 bg-[#1f2b5b];
}

.brand-content {
  @apply h-full flex flex-col items-center justify-center text-white;
}

.brand-title {
  @apply text-6xl font-bold mb-4;
}

.brand-subtitle {
  @apply text-4xl font-medium;
}
</style>
