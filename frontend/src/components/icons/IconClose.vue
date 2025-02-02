<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 24,
  },
})
</script>

<template>
  <span>
    <svg
      :height="size"
      :width="size"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 7L7 17M7 7L17 17"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
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
