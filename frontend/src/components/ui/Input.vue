<script setup>
defineProps(['modelValue', 'placeholder'])
</script>

<template>
  <div class="input">
    <label class="label_input" for="text-input">
      <input
        :value="modelValue"
        :placeholder="placeholder"
        id="text-input"
        type="text"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  grid-gap: calc(0.25 * 4rem);
  gap: calc(0.25 * 4rem);
  align-items: center;

  .label_input {
    --border: hsla(222deg 10% 17% / 1);
    --outline: transparent;
    --svg: hsla(222deg 5% 56% / 0.75);
    --bg: transparent;
    height: calc(0.25 * 9rem);
    padding-inline: calc(0.25 * 3rem);
    display: flex;
    align-items: center;
    grid-gap: calc(0.25 * 2rem);
    gap: calc(0.25 * 2rem);
    flex: 1;
    cursor: text;
    white-space: nowrap;
    background-color: var(--bg);
    border-radius: 5px;
    border: 1px solid var(--border) !important;
    outline: 2px solid var(--outline);
    outline-offset: 2px;
    transition: 0.2s all;

    &:focus-within {
      --border: hsla(222deg 6% 30% / 1);
      --bg: hsla(0deg 0% 100% / 6%);
      --svg: hsla(222deg 5% 62% / 1);
      --outline: hsla(222deg 5% 62% / 0.15);
      z-index: 3;
    }

    &:hover {
      --border: hsla(222deg 6% 30% / 1);
      --bg: hsla(0deg 0% 100% / 6%);
    }

    #text-input {
      flex: 1;
      background: transparent;
      outline: none;
      font-size: 0.8125rem;
      font-family: inherit;
      color: inherit;
      line-height: 1.6;
      border: none;
    }
  }
}
</style>
