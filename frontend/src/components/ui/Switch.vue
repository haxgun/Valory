<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const emits = defineEmits<{
  (event: 'update:checked', checked: boolean): void;
  (event: 'updateCheckboxGroup', payload: { optionId: string; checked: boolean }): void;
}>();

const props = defineProps<{
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  group?: boolean;
  id?: string;
}>({
  name: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  group: {
    type: Boolean,
    default: false,
  },
});

const handleClick = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.group) {
    emits('updateCheckboxGroup', { optionId: props.id ?? '', checked: target.checked });
  } else {
    emits('update:checked', target.checked);
  }
};
</script>

<template>
  <div class="switch__container">
    <input
      type="checkbox"
      class="switch"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @input="handleClick"
    />
  </div>
</template>

<style lang="scss" scoped>
.switch__container {
  display: flex;

  .switch {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #dfe1e4;
    border-radius: 72px;
    border-style: none;
    flex-shrink: 0;
    height: 20px;
    margin: 0;
    position: relative;
    width: 30px;
    box-shadow: none;
    transition: all 0.1s ease-out;

    &:before {
      content: '';
      inset: -6px;
      position: absolute;
    }

    &:after {
      transition: all 0.1s ease-out;
      background-color: #fff;
      border-radius: 50%;
      content: '';
      height: 14px;
      left: 3px;
      position: absolute;
      top: 3px;
      width: 14px;
    }

    &:hover {
      background-color: #c9cbcd;
      transition-duration: 0s;
    }

    &:checked {
      background-color: #6e79d6;

      &:after {
        background-color: #fff;
        left: 13px;
      }

      &:hover {
        background-color: #535db3;
      }
    }
  }

  input[type='checkbox'] {
    cursor: default;
  }

  &:focus:not(.focus-visible) {
    outline: 0;
  }
}
</style>
