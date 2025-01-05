<script lang="ts" setup>
interface Props {
  name?: string
  value?: string
  checked?: boolean
  disabled?: boolean
  group?: boolean
  id?: string
}

const emits = defineEmits<{
  (event: 'update:checked', checked: boolean): void
  (event: 'updateCheckboxGroup', payload: { optionId?: string; checked: boolean }): void
}>()

const props = defineProps<Props>()

const handleClick = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (props.group) {
    emits('updateCheckboxGroup', { optionId: props.id, checked: target.checked })
  } else {
    emits('update:checked', target.checked)
  }
}
</script>

<template>
  <div class="switch__container">
    <input
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :value="value"
      class="switch"
      type="checkbox"
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
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 72px;
    border-style: none;
    flex-shrink: 0;
    height: 20px;
    margin: 0;
    position: relative;
    width: 36px;
    box-shadow: none;
    transition: all 0.15s ease-out;

    &:before {
      content: '';
      inset: -6px;
      position: absolute;
    }

    &:after {
      transition: all 0.15s ease-out;
      background-color: #171717;
      border-radius: 50%;
      content: '';
      height: 16px;
      width: 16px;
      left: 2px;
      position: absolute;
      top: 2px;
    }

    &:hover {
      transition-duration: 0s;
    }

    &:checked {
      box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.1);
      background-color: #fff;

      &:after {
        left: 18px;
      }
    }
  }

  input[type='checkbox'] {
    cursor: pointer;
  }

  &:focus:not(.focus-visible) {
    outline: 0;
  }
}
</style>
