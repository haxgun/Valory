<script setup lang="ts">
import { ColorPicker } from 'vue-accessible-color-picker'
</script>

<template>
  <ColorPicker alphaChannel="hide" default-format="hex" :visible-f ormats="['hex']" />
</template>

<style lang="scss" scoped>
$v-spacing: 6px;
$v-width-color-space: 300px;
$v-font-size: 0.8em;
$v-color-text: currentColor;
$v-color-background: #fff;
$v-color-focus: #19f;
$v-thumb-size: calc($v-spacing * 4);
$v-slider-track-height: calc($v-spacing * 3);
$v-slider-thumb-size: calc($v-spacing * 4 - 1px * 2);

:root {
  .vacp-color-picker {
    max-width: $v-width-color-space;
    padding: $v-spacing;
    display: grid;
    gap: $v-spacing;
    grid-template-columns: 1fr min-content;
    font-size: $v-font-size;
    color: $v-color-text;
    background-color: $v-color-background;

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    button::-moz-focus-inner {
      border: none;
      padding: 0;
    }

    :focus {
      outline: 2px solid $v-color-focus;
    }
  }

  .vacp-color-space {
    grid-column: 1/-1;
    overflow: hidden;
    aspect-ratio: 1/0.6;
  }

  .vacp-color-space-thumb {
    width: $v-thumb-size;
    height: $v-thumb-size;
    margin-left: calc(-1 * $v-thumb-size / 2);
    margin-bottom: calc(-1 * $v-thumb-size / 2);
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #000;
    transform: rotate(0);

    :focus {
      outline-color: transparent;
      box-shadow:
        0 0 0 1px #000,
        0 0 0 calc(1px + 2px) $v-color-focus;
    }
  }

  .vacp-range-input-label {
    display: block;
  }

  .vacp-range-input-group {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > :not(:first-child) {
      margin-top: $v-spacing;
    }
  }

  .vacp-range-input,
  .vacp-range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  .vacp-range-input {
    display: block;
    width: 100%;
    height: $v-slider-track-height;
    margin: calc($v-spacing / 2 + 1px) 0;
    padding: 0;
    border: none;
    background: none;

    &:focus {
      outline: none;
    }

    &--alpha {
      background-color: #fff;
      background-image: linear-gradient(
          45deg,
          #eee 25%,
          transparent 25%,
          transparent 75%,
          #eee 75%,
          #eee
        ),
        linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee);
      background-size: calc($v-spacing * 2) calc($v-spacing * 2);
      background-position:
        0 0,
        $v-spacing $v-spacing;

      &::-moz-range-track,
      &::-webkit-slider-runnable-track,
      &::-ms-track {
        background-image: linear-gradient(to right, transparent, var(--vacp-color));
      }
    }

    &--hue {
      &::-moz-range-track,
      &::-webkit-slider-runnable-track,
      &::-ms-track {
        background-image: linear-gradient(to right, red, #ff0, #0f0, #0ff, #00f, #f0f, red);
      }
    }

    &::-moz-range-thumb,
    &::-webkit-slider-thumb,
    &::-ms-thumb {
      box-sizing: border-box;
      width: $v-slider-thumb-size;
      height: $v-slider-thumb-size;
      border: 3px solid #fff;
      border-radius: 50%;
      background-color: transparent;
      box-shadow: 0 0 0 1px #000;
      isolation: isolate;
    }
  }

  .vacp-copy-button {
    visibility: hidden;
    display: flex;
    color: #fff;
    justify-self: center;
    align-self: center;
    position: relative;
    overflow: hidden;
    //display: flex;
    align-items: center;
    justify-content: center;
    width: calc($v-spacing * 6);
    height: calc($v-spacing * 6);
    border: 1px solid transparent;
    border-radius: 50%;
    color: $v-color-text;
    background-color: $v-color-background;

    &:focus {
      outline: none;
      border-color: #000;
      box-shadow: 0 0 0 2px $v-color-focus;
    }

    &:enabled:hover {
      background-color: #0002;
    }
  }

  .vacp-color-inputs {
    grid-column: 1/-1;
    display: flex;
    align-items: center;

    > :not(:first-child) {
      margin-left: $v-spacing;
    }
  }

  .vacp-color-input-group {
    flex-grow: 1;
    display: grid;
    grid-auto-flow: column;
    column-gap: $v-spacing;
  }

  .vacp-color-input-label {
    text-align: center;
  }

  .vacp-color-input {
    width: 100%;
    margin: calc($v-spacing / 2) 0;
    padding: $v-spacing;
    border: 1px solid #000;
    font: inherit;
    text-align: center;
    color: $v-color-text;
    background-color: $v-color-background;
  }

  .vacp-format-switch-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: $v-spacing;
    border: 1px solid transparent;
    border-radius: 50%;
    font: inherit;
    color: $v-color-text;
    background-color: $v-color-background;

    &:focus {
      border-color: #000;
    }

    &:enabled:hover {
      background-color: #0002;
    }
  }

  .vacp-visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    white-space: nowrap;
  }
}
</style>
