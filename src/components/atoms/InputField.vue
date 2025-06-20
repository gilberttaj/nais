<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="input-label">
      {{ label }} {{ required ? '*' : '' }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :class="[
          'input-field',
          error ? 'input-error' : ''
        ]"
      />
      <div v-if="type === 'password'" class="password-toggle">
        <span @click="$emit('toggle-password')" class="toggle-icon">
          <slot name="icon"></slot>
        </span>
      </div>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue', 'toggle-password']);
</script>

<style scoped lang="postcss">
.input-container {
  @apply mb-4;
}

.input-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary;
}

.input-error {
  @apply border-red-500 focus:ring-red-500;
}

.password-toggle {
  @apply absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer;
}

.toggle-icon {
  @apply text-gray-500;
}

.error-message {
  @apply mt-1 text-sm text-red-500;
}
</style>
