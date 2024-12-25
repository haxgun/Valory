<script setup lang="ts">
import Button from '@/components/ui/uiButton.vue'
import Switch from '@/components/ui/uiSwitch.vue'
import { ref } from 'vue'
import UiColorPicker from "@/components/ui/uiColorPicker.vue";

const switchProfessional = ref<boolean>(false)
</script>

<template>
  <h1>{{ switchProfessional }}</h1>
  <Switch name="switch" v-model:checked="switchProfessional" />
  <Button variant="outline" @click="$router.push('/editor')" :disabled="true">TEST</Button>
  <ui-color-picker />
</template>

<style scoped></style>
