<template>
  <div class="dots-spinner" :style="spinnerStyle">
    <div v-for="n in 12" :key="n" class="dot" :style="dotStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: Number,
    default: 40
  },
  dotSize: {
    type: Number,
    default: null
  },
  color: {
    type: String,
    default: '#666'
  }
});

const spinnerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}));

const dotStyle = computed(() => {
  const calculatedDotSize = props.dotSize || Math.max(Math.floor(props.size / 5), 4);
  const centerPoint = props.size / 2;
  
  return {
    width: `${calculatedDotSize}px`,
    height: `${calculatedDotSize}px`,
    backgroundColor: props.color,
    transformOrigin: `${centerPoint}px ${centerPoint}px`
  };
});
</script>

<style scoped lang="postcss">
.dots-spinner {
  @apply relative inline-block;
}

.dot {
  @apply rounded-full absolute;
  animation: fade 1.2s linear infinite;
}

.dot:nth-child(1) { transform: rotate(0deg) translate(50%); animation-delay: 0s; }
.dot:nth-child(2) { transform: rotate(30deg) translate(50%); animation-delay: -1.1s; }
.dot:nth-child(3) { transform: rotate(60deg) translate(50%); animation-delay: -1.0s; }
.dot:nth-child(4) { transform: rotate(90deg) translate(50%); animation-delay: -0.9s; }
.dot:nth-child(5) { transform: rotate(120deg) translate(50%); animation-delay: -0.8s; }
.dot:nth-child(6) { transform: rotate(150deg) translate(50%); animation-delay: -0.7s; }
.dot:nth-child(7) { transform: rotate(180deg) translate(50%); animation-delay: -0.6s; }
.dot:nth-child(8) { transform: rotate(210deg) translate(50%); animation-delay: -0.5s; }
.dot:nth-child(9) { transform: rotate(240deg) translate(50%); animation-delay: -0.4s; }
.dot:nth-child(10) { transform: rotate(270deg) translate(50%); animation-delay: -0.3s; }
.dot:nth-child(11) { transform: rotate(300deg) translate(50%); animation-delay: -0.2s; }
.dot:nth-child(12) { transform: rotate(330deg) translate(50%); animation-delay: -0.1s; }

@keyframes fade {
  0%, 39%, 100% {
    opacity: 0.2;
  }
  40%, 60% {
    opacity: 1;
  }
}
</style>
