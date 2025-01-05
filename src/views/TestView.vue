<script lang="ts" setup>
import Button from '@/components/ui/ButtonUI.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import Switch from '@/components/ui/Switch.vue'
import { ref } from 'vue'

// Переключатель профессионального режима
const switchProfessional = ref(false)

// Цветовая модель для ColorPicker
const color = ref('#ffffff')
</script>

<template>
  <div>
    <h1>Professional Mode: {{ switchProfessional }}</h1>
    <Switch v-model:checked="switchProfessional" name="switch" />
    <Button :disabled="true" variant="outline" @click="$router.push('/editor')"> TEST</Button>
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
