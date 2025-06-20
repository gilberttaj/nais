<template>
  <div class="divider-container">
    <div class="divider-line"></div>
    <div class="divider-text">{{ text }}</div>
    <div class="divider-line"></div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Or'
  }
})
</script>

<style scoped lang="postcss">
.divider-container {
  @apply flex items-center my-4;
}

.divider-line {
  @apply flex-grow border-t border-gray-300;
}

.divider-text {
  @apply px-4 text-gray-500 text-sm;
}
</style>
