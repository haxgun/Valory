<script setup lang="ts">
import Button from '@/components/ui/ButtonUI.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import Switch from '@/components/ui/SwitchUI.vue'
import { ref } from 'vue'

// Переключатель профессионального режима
const switchProfessional = ref(false)

// Цветовая модель для ColorPicker
const color = ref({
  hue: 120,
  alpha: 22.014388489208635,
  rgb: { r: 255, g: 255, b: 255 },
})
</script>

<template>
  <div>
    <h1>Professional Mode: {{ switchProfessional }}</h1>
    <Switch name="switch" v-model:checked="switchProfessional" />
    <Button variant="outline" @click="$router.push('/editor')" :disabled="true"> TEST </Button>
    <ColorPicker v-model="color" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
