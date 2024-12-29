<script setup lang="ts">
const props = defineProps<{
  checked: boolean
}>()
</script>
<template>
  <li class="dropdown-item" :class="{ active: props.checked }" @click="$emit('select')">
    <slot></slot>
  </li>
</template>
<style lang="scss" scoped>
.dropdown-item {
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 300;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;

  &.active,
  &:not(.title):hover {
    background-color: hsl(0, 0%, 12%);
  }
}
</style>
