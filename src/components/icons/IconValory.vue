<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 24,
  },
  color: {
    type: String,
    default: '#FA4454',
  },
})
</script>

<template>
  <span>
    <svg
      :height="size"
      :width="size"
      fill="none"
      viewBox="0 0 680 680"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :fill="color"
        clip-rule="evenodd"
        d="M339.142 6L51 162.9V326.506L339.142 479.383L627.285 326.506V162.9L339.142 6ZM339.431 136.682L205.247 209.576V285.585L339.431 356.61L473.615 285.585V209.576L339.431 136.682Z"
        fill-rule="evenodd"
      />
      <path
        :fill="color"
        d="M339.5 548.547L628 395.906V520.697L339.5 673.337L51 520.697V395.906L339.5 548.547Z"
      />
    </svg>
  </span>
</template>

<style scoped>
span {
  line-height: 0;
}
</style>
