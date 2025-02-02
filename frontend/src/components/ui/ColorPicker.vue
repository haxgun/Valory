<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import tinycolor from 'tinycolor2'
import { onMounted, reactive, ref, watch } from 'vue'

interface RGB {
  r: number
  g: number
  b: number
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '#ffffff',
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const hue = ref<number>(0)
const saturation = ref<number>(1)
const brightness = ref<number>(1)
const rgb = reactive<RGB>({ r: 255, g: 255, b: 255 })
const hex = ref<string>(props.modelValue)

const openColorPickerRef = ref<boolean>(false)
const colorPickerRef = ref<HTMLDivElement | null>(null)

const presetColors: string[] = [
  '#BB2649',
  '#F25C54',
  '#A78EC1',
  '#FF9F00',
  '#43B2A1',
  '#F1F2F2',
  '#FF9E6D',
  '#004F8C',
  '#B4A0D0',
  '#F2C1D1',
  '#F1B79B',
  '#F4A300',
  '#0D7A56',
  '#E8C6D2',
  '#4C8C8B',
  '#07090E',
]

const saturationRef = ref<HTMLDivElement | null>(null)
const hueRef = ref<HTMLDivElement | null>(null)

const isColorPickerUp = ref<boolean>(false)

const openColorPickerToggle = () => {
  openColorPickerRef.value = !openColorPickerRef.value

  if (colorPickerRef.value) {
    const rect = colorPickerRef.value.getBoundingClientRect()
    const screenHeight = window.innerHeight
    isColorPickerUp.value = rect.top > screenHeight / 2
  }
}

function updateColor(): void {
  const color = tinycolor({ h: hue.value, s: saturation.value, v: brightness.value })
  const { r, g, b } = color.toRgb()
  rgb.r = r
  rgb.g = g
  rgb.b = b
  hex.value = color.toHexString()
  emit('update:modelValue', hex.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    const color = tinycolor(newValue)
    if (color.isValid()) {
      const hsv = color.toHsv()
      hue.value = hsv.h
      saturation.value = hsv.s
      brightness.value = hsv.v
      updateColor()
    }
  },
  { immediate: true },
)

function updateColorFromHex(): void {
  const color = tinycolor(hex.value)
  if (color.isValid()) {
    const hsv = color.toHsv()
    hue.value = hsv.h
    saturation.value = hsv.s
    brightness.value = hsv.v
    updateColor()
  }
}

function updateColorFromRGB(): void {
  const color = tinycolor({ r: rgb.r, g: rgb.g, b: rgb.b })
  if (color.isValid()) {
    const hsv = color.toHsv()
    hue.value = hsv.h
    saturation.value = hsv.s
    brightness.value = hsv.v
    updateColor()
  }
}

function setPresetColor(color: string): void {
  const selectedColor = tinycolor(color)
  const hsv = selectedColor.toHsv()
  hue.value = hsv.h
  saturation.value = hsv.s
  brightness.value = hsv.v
  updateColor()
}

function startSaturationDrag(): void {
  const onMouseMove = (e: MouseEvent) => {
    if (!saturationRef.value) return
    const rect = saturationRef.value.getBoundingClientRect()
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height)
    saturation.value = x / rect.width
    brightness.value = 1 - y / rect.height
    updateColor()
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function startHueDrag(): void {
  const onMouseMove = (e: MouseEvent) => {
    if (!hueRef.value) return
    const rect = hueRef.value.getBoundingClientRect()
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
    hue.value = (x / rect.width) * 360
    updateColor()
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

onMounted(() => {
  const color = tinycolor(hex.value)
  if (color.isValid()) {
    const hsv = color.toHsv()
    hue.value = hsv.h
    saturation.value = hsv.s
    brightness.value = hsv.v
    updateColor()
  }
})

onClickOutside(colorPickerRef, () => (openColorPickerRef.value = false))
</script>

<template>
  <div ref="colorPickerRef" class="color-picker-component">
    <div class="color-selector">
      <button
        :style="{
          backgroundColor: hex,
        }"
        class="colorpicker-button"
        @click="openColorPickerToggle"
      ></button>
      <input v-model="hex" type="text" @input="updateColorFromHex" />
    </div>
    <Transition name="slide-fade">
      <div v-if="openColorPickerRef" :class="{ up: isColorPickerUp }" class="color-picker">
        <div
          ref="saturationRef"
          :style="{ backgroundColor: `hsl(${hue}, 100%, 50%)` }"
          class="saturation"
          @mousedown="startSaturationDrag"
        >
          <div
            :style="{
              left: `${saturation * 100}%`,
              top: `${(1 - brightness) * 100}%`,
              backgroundColor: hex,
            }"
            class="saturation-pointer"
          ></div>
          <div class="saturation-white"></div>
          <div class="saturation-black"></div>
        </div>

        <div ref="hueRef" class="hue" @mousedown="startHueDrag">
          <div :style="{ left: `calc(${(hue / 360) * 100}% - 7px)` }" class="hue-pointer"></div>
        </div>

        <div class="inputs">
          <div>
            <span class="input">
              <input id="hex" v-model="hex" @input="updateColorFromHex" />
            </span>
          </div>
          <div>
            <span class="input">
              <input id="r" v-model.number="rgb.r" @input="updateColorFromRGB" />
            </span>
          </div>
          <div>
            <span class="input">
              <input id="g" v-model.number="rgb.g" @input="updateColorFromRGB" />
            </span>
          </div>
          <div>
            <span class="input">
              <input id="b" v-model.number="rgb.b" @input="updateColorFromRGB" />
            </span>
          </div>
        </div>

        <div class="presets">
          <div
            v-for="color in presetColors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="preset-color"
            @click="setPresetColor(color)"
          ></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.color-picker-component {
  position: relative;
}

.color-selector {
  --border: hsla(222deg 10% 17% / 1);
  --outline: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--border) !important;
  outline: 2px solid var(--outline);
  outline-offset: 2px;
  width: fit-content;
  padding: 8px;
  transition: 0.2s;

  &:hover {
    --border: hsla(222deg 6% 30% / 1);
    --bg: rgba(255, 255, 255, 0.05);
  }

  &:focus-within {
    --border: hsla(222deg 6% 30% / 1);
    --bg: hsla(0deg 0% 100% / 6%);
    --outline: hsla(222deg 5% 62% / 0.15);
    z-index: 3;
  }

  input {
    --bg: transparent;
    --border: hsla(222deg 10% 17% / 1);
    --outline: transparent;
    background: var(--bg);
    color: #fff;
    width: fit-content;
    border: none;
    outline: none;
    font-size: 14px;
  }
}

.colorpicker-button {
  height: 20px;
  width: 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  box-shadow: inset 0px 0px 0px 2px rgba(255, 255, 255, 0.25);
  transition: background-color 0.1s;
}

.color-picker {
  z-index: 999;

  position: absolute;
  top: 100%;
  left: 0;
  margin: 10px 0 0 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 260px;
  padding: 12px;
  background-color: hsl(0, 0%, 9%);
  border-radius: 6px;
  border: 1px solid hsla(222, 6%, 30%, 0.25);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &.up {
    top: auto;
    bottom: 100%;
    margin: 0 0 10px 0;
  }

  .saturation,
  .saturation-white,
  .saturation-black {
    position: relative;
    width: 100%;
    height: 150px;
    background: red;
    cursor: crosshair;

    .saturation-white {
      position: absolute;
      background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
    }

    .saturation-black {
      position: absolute;
      background: linear-gradient(0deg, #000, transparent);
    }

    .saturation-pointer {
      position: absolute;
      width: 10px;
      height: 10px;
      border: 2px solid #fff;
      z-index: 999;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .hue {
    position: relative;
    width: 100%;
    height: 10px;
    background: linear-gradient(to right, red, yellow, lime, aqua, blue, magenta, red);
    cursor: pointer;
    border-radius: 2.5px;

    .hue-pointer {
      position: absolute;
      width: 14px;
      height: 14px;
      background-color: #fff;
      border-radius: 999px;
      border: 3px solid #fff;
      cursor: pointer;
      transform: translateY(-50%);
      top: 50%;
    }
  }

  .presets {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;

    .preset-color {
      width: 22px;
      height: 22px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .inputs {
    display: grid;
    gap: 4px;
    align-items: center;
    align-content: center;
    grid-template-columns: 2fr repeat(3, 1fr);
    grid-template-rows: 1fr;

    div {
      label {
        font-size: 0.8125rem;
        text-transform: uppercase;
      }

      span.input {
        --border: hsla(222deg 10% 17% / 1);
        --outline: transparent;
        --svg: hsla(222deg 5% 56% / 0.75);
        --bg: transparent;
        height: calc(0.25 * 9rem);
        padding-inline: calc(0.25 * 2rem);
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
        outline: 1px solid var(--outline);
        outline-offset: 2px;
        transition: 0.2s all;

        &:hover {
          --border: hsla(222deg 6% 30% / 1);
          --bg: hsla(0deg 0% 100% / 6%);
        }

        &:focus-within {
          --border: hsla(222deg 6% 30% / 1);
          --bg: hsla(0deg 0% 100% / 6%);
          --outline: hsla(222deg 5% 62% / 0.15);
          z-index: 3;
        }
      }

      input {
        flex: 1;
        background: transparent;
        outline: none;
        font-size: 0.8125rem;
        font-family: inherit;
        color: inherit;
        line-height: 1.6;
        border: none;
        width: 100%;
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.1s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.1s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
