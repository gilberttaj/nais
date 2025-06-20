<template>
  <button 
    :class="[
      'btn',
      `btn-${variant}`,
      fullWidth ? 'btn-full' : '',
      disabled ? 'btn-disabled' : ''
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline', 'text'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>

<style scoped lang="postcss">
.btn {
  @apply transition duration-200 flex items-center justify-center;
}

.btn-primary {
  @apply bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md;
}

.btn-outline {
  @apply border border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded-md;
}

.btn-text {
  @apply text-primary hover:text-primary-dark font-semibold;
}

.btn-full {
  @apply w-full;
}

.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
