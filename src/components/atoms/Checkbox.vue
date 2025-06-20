<template>
  <div class="checkbox-container">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox-input"
    />
    <label :for="id" class="checkbox-label">
      <slot></slot>
    </label>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped lang="postcss">
.checkbox-container {
  @apply flex items-center;
}

.checkbox-input {
  @apply w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded;
}

.checkbox-label {
  @apply ml-2 block text-sm text-gray-700;
}
</style>
