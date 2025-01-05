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
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#1C1C1E" height="1024" rx="239" width="1024" />
      <path
        clip-rule="evenodd"
        d="M511.142 186L223 342.9V506.506L511.142 659.383L799.285 506.506V342.9L511.142 186ZM511.431 316.682L377.247 389.576V465.585L511.431 536.61L645.615 465.585V389.576L511.431 316.682Z"
        fill="#FA4454"
        fill-rule="evenodd"
      />
      <path
        d="M511.5 728.547L800 575.906V700.697L511.5 853.337L223 700.697V575.906L511.5 728.547Z"
        fill="#FA4454"
      />
    </svg>
  </span>
</template>

<style scoped>
span {
  line-height: 0;
}
</style>
