<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import tinycolor from 'tinycolor2'
import { computed, reactive, ref, watch } from 'vue'

interface ColorModel {
  hue: number
  rgb: { r: number; g: number; b: number }
}

const props = defineProps<{
  modelValue: ColorModel
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: ColorModel): void
}>()

const openColorPickerRef = ref<boolean>(false)
const isColorPickerUp = ref<boolean>(false)
const saturationRef = ref<HTMLDivElement | null>(null)
const colorPickerRef = ref<HTMLDivElement | null>(null)

const openColorPickerToggle = () => {
  openColorPickerRef.value = !openColorPickerRef.value

  if (colorPickerRef.value) {
    const rect = colorPickerRef.value.getBoundingClientRect()
    const screenHeight = window.innerHeight
    isColorPickerUp.value = rect.top > screenHeight / 2
  }
}

const localColor = reactive({
  hue: props.modelValue.hue || 0,
  rgb: props.modelValue.rgb || { r: 255, g: 0, b: 0 },
  get hex(): string {
    return tinycolor(this.rgb).toHex8String()
  },
  set hex(value: string) {
    const color = tinycolor(value)
    if (color.isValid()) {
      Object.assign(this.rgb, color.toRgb())
    }
  },
})

const hueGradient = computed(
  () =>
    `linear-gradient(to right, ${Array(7)
      .fill(null)
      .map((_, i) => tinycolor({ h: i * 60, s: 1, v: 1 }).toHexString())
      .join(', ')})`,
)

const saturationIndicatorStyle = computed(() => {
  const hsv = tinycolor(localColor.rgb).toHsv()
  return {
    left: `${hsv.s * 100}%`,
    top: `${100 - hsv.v * 100}%`,
  }
})

watch(
  localColor,
  () => {
    emit('update:modelValue', {
      hue: localColor.hue,
      rgb: { ...localColor.rgb },
    })
  },
  { deep: true },
)

const updateFromHSV = (): void => {
  const color = tinycolor({ h: localColor.hue, s: 1, v: 1 })
  Object.assign(localColor.rgb, color.toRgb())
}

const updateFromRGB = (): void => {
  const color = tinycolor(localColor.rgb)
  localColor.hue = color.toHsv().h
}

const onSaturationMouseDown = (): void => {
  if (!saturationRef.value) return
  const rect = saturationRef.value.getBoundingClientRect()

  const onMouseMove = (e: MouseEvent): void => {
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
    const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height)
    const s = x / rect.width
    const v = 1 - y / rect.height
    const color = tinycolor({ h: localColor.hue, s, v })
    Object.assign(localColor.rgb, color.toRgb())
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', onMouseMove)
    },
    { once: true },
  )
}

const onHexInput = (): void => {
  const color = tinycolor(localColor.hex)
  if (color.isValid()) {
    Object.assign(localColor.rgb, color.toRgb())
  }
}

const setPresetColor = (color: string): void => {
  const parsedColor = tinycolor(color)
  Object.assign(localColor.rgb, parsedColor.toRgb())
}

const presetColors = [
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
  '#6C6C6C',
]

const onHueSliderMouseDown = (event: MouseEvent): void => {
  const rect = event.currentTarget.getBoundingClientRect()
  const maxWidth = rect.width

  const onMouseMove = (e: MouseEvent): void => {
    const x = Math.min(Math.max(e.clientX - rect.left, 0), maxWidth)
    const newHue = (x / maxWidth) * 360
    localColor.hue = newHue
    updateFromHSV()
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', onMouseMove)
    },
    { once: true },
  )
}

onClickOutside(colorPickerRef, () => (openColorPickerRef.value = false))
</script>

<template>
  <div style="position: relative" ref="colorPickerRef">
    <div class="color-selector">
      <button
        :style="{
          backgroundColor: `rgb(${localColor.rgb.r}, ${localColor.rgb.g}, ${localColor.rgb.b})`,
        }"
        @click="openColorPickerToggle"
        class="colorpicker-button"
      ></button>
      <input type="text" v-model="localColor.hex" @input="onHexInput" />
    </div>
    <Transition name="slide-fade">
      <div v-if="openColorPickerRef" class="color-picker" :class="{ up: isColorPickerUp }">
        <div class="saturation-wrap">
          <div
            :style="{
              backgroundColor: `rgb(${localColor.rgb.r}, ${localColor.rgb.g}, ${localColor.rgb.b}`,
            }"
            class="saturation"
            ref="saturationRef"
            @mousedown="onSaturationMouseDown"
          >
            <div class="saturation-indicator" :style="saturationIndicatorStyle"></div>
            <div class="saturation-white"></div>
            <div class="saturation-black"></div>
          </div>
        </div>
        <div class="slider hue-slider" @mousedown="onHueSliderMouseDown">
          <div class="gradient" :style="{ background: hueGradient }"></div>
          <div
            class="slider-handle"
            :style="{
              left: `${(localColor.hue / 360) * 100}%`,
              backgroundColor: `rgb(${localColor.rgb.r}, ${localColor.rgb.g}, ${localColor.rgb.b}`,
            }"
          ></div>
        </div>
        <div class="color-inputs">
          <div class="input">
            <label for="hex">
              <input id="hex" v-model="localColor.hex" @input="onHexInput" />
            </label>
          </div>
          <div class="input">
            <label for="r">
              <input id="r" v-model.number="localColor.rgb.r" @input="updateFromRGB" />
            </label>
          </div>
          <div class="input">
            <label for="g">
              <input id="g" v-model.number="localColor.rgb.g" @input="updateFromRGB" />
            </label>
          </div>
          <div class="input">
            <label for="b">
              <input id="b" v-model.number="localColor.rgb.b" @input="updateFromRGB" />
            </label>
          </div>
        </div>

        <div class="preset-colors">
          <div
            v-for="color in presetColors"
            :key="color"
            :style="{ backgroundColor: color }"
            @click="setPresetColor(color)"
          ></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.color-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: hsl(0, 0%, 9%);
  border-radius: 8px;
  border: 1px solid hsla(222, 6%, 30%, 0.25);
  width: fit-content;
  padding: 8px;

  input {
    background: transparent;
    outline: none;
    border: none;
    color: #fff;
    width: fit-content;
  }
}

.colorpicker-button {
  height: 28px;
  width: 28px;
  border-radius: 6px;
  border: none;
  box-shadow: inset 0px 0px 0px 2px rgba(255, 255, 255, 0.25);
}

.color-picker {
  position: absolute;
  top: 100%;
  margin: 10px 0 0 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 290px;
  padding: 12px;
  background-color: hsl(0, 0%, 9%);
  border-radius: 6px;
  border: 1px solid hsla(222, 6%, 30%, 0.25);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &.up {
    top: auto;
    margin: 0 0 10px 0;
    bottom: 100%;
  }
}

.saturation-wrap {
  overflow: hidden;
  padding-bottom: 75%;
  position: relative;
  width: 100%;
}

.saturation,
.saturation-black,
.saturation-white {
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 3px;

  .saturation-white {
    background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
  }

  .saturation-black {
    background: linear-gradient(0deg, #000, transparent);
  }
}

.saturation-indicator {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  z-index: 3;
}

.slider {
  display: flex;
  align-items: center;
  position: relative;

  .gradient {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 10px;
    transform: translateY(-50%);
    border-radius: 2.5px;
  }

  .slider-handle {
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 999px;
    border: 3px solid #fff;
    cursor: pointer;
    transform: translateY(-50%);
    top: 50%;
  }
}

.color-inputs {
  display: grid;
  gap: 4px;
  align-items: center;
  align-content: center;
  grid-template-columns: 2fr repeat(3, 1fr);
  grid-template-rows: 1fr;

  .input {
    display: flex;
    grid-gap: calc(0.25 * 4rem);
    gap: calc(0.25 * 4rem);
    align-items: center;
  }

  label {
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
    outline: 2px solid var(--outline);
    outline-offset: 2px;
    transition: 0.2s all;

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

.preset-colors {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;

  div {
    width: 26px;
    height: 26px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    cursor: pointer;
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
