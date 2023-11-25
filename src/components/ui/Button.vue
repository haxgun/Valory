<script setup>
defineProps({
  variant: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="[variant, {'disabled': disabled}]">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  line-height: 1;
  font-size: 0.875rem;
  width: fit-content;
  padding: 0.875rem 1.1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  background: #fff;
  transition: all 0.2s;
  text-decoration: none;
  cursor: pointer;
  color: #111;
  border: 1px solid hsla(0, 0%, 100%, 0.3);
  box-shadow: rgb(255 255 255 / 2%) 0px 10px 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(.disabled):hover {
    color: #111;
    background-color: #f3f4f6;
  }

  &:not(.disabled):active {
    color: #111;
    background-color: #e5e7eb;
  }

  &.outline {
    background: none;
    color: #fff;
  }

  &.outline:not(.disabled):hover {
    background-color: #ffffff0d;
    border-color: #ffffff80;
  }

  &.outline:not(.disabled):active {
    background-color: #fff0;
    color: #ffffff80;
    border-color: #fff3;
  }
}
</style>
