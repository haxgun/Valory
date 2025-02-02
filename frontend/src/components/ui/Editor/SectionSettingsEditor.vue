<script lang="ts" setup>
import { useSlots } from 'vue'

const slots = useSlots()
const props = defineProps({
  isModal: { type: Boolean, default: false },
})
</script>

<template>
  <div :class="{ modal: props.isModal }" class="editor__settings">
    <div class="editor__settings__header">
      <h1 class="title">
        <slot name="title"></slot>
      </h1>
      <p class="description">
        <slot name="description"></slot>
      </p>
    </div>
    <div class="editor__input">
      <slot name="input"></slot>
    </div>
    <div v-if="slots.footer" class="editor__settings__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1,
p {
  margin: 0;
}

.editor__settings {
  padding: calc(0.25 * 6rem);
  border-bottom: 1px solid hsla(222deg 6% 30% / 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;

  &.modal,
  &.switch {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .reset {
      color: red;
      font-size: 12px;
      font-weight: 400;
    }
  }

  .title {
    font-weight: 600;
    font-size: calc(0.25 * 4.5rem);
  }

  .description {
    color: hsla(222deg 5% 62% / 1);
    font-size: 0.875rem;
    line-height: 1.5;

    display: flex;
    flex-direction: column;
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

    .editor__button {
      border-radius: 5px;
      padding: 0.7rem 1.1rem;
      font-size: 0.75rem;
    }
  }

  .editor__settings__header {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .editor__settings__footer {
    p {
      color: hsl(222deg 3.53% 27.53%);
      font-size: 0.875rem;
    }
  }

  .under_description {
    color: rgb(0, 143, 253);
    font-size: 0.875rem;
    line-height: 1.5;
    cursor: pointer;
    transition: box-shadow 0.2s linear;
    box-shadow: none;
    width: fit-content;

    &:hover {
      box-shadow: 0 1px 0 rgb(0, 143, 253);
    }
  }
}
</style>
