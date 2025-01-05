<script lang="ts" setup>
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <div class="editor__settings">
    <div class="editor__settings__header">
      <slot name="header"></slot>
    </div>
    <div v-if="slots.input" class="editor__input">
      <slot name="input"></slot>
    </div>
    <div v-if="slots.options" class="editor__settings__options">
      <slot name="options"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss" scoped>
.editor__settings {
  padding: calc(0.25 * 6rem);
  border-bottom: 1px solid hsla(222deg 6% 30% / 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;

  .editor__settings__header {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .editor__settings__options {
    border-top: 1px dashed hsla(222deg 6% 30% / 0.25);

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;

      &:first-child {
        margin-top: 15px;
      }
    }
  }

  .editor__input {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
