<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 48,
  },
})
</script>

<template>
  <span>
    <svg :height="size" :width="size" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        fill="none"
        stroke="#00C4FA"
        stroke-dasharray="300 385"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-width="14"
      >
        <animate
          attributeName="stroke-dashoffset"
          calcMode="spline"
          dur="2"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
          values="685;-685"
        ></animate>
      </path>
    </svg>
  </span>
</template>

<style scoped>
span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 0;
  line-height: 0;
}
</style>
