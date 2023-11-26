<script setup>
import Button from '@/components/ui/Button.vue'
import Switch from '@/components/ui/Switch.vue'
import { ref } from 'vue'

const switchProfessional = ref(false)
</script>

<template>
  <h1>{{ switchProfessional }}</h1>
  <Switch name="switch" v-model:checked="switchProfessional" />
  <Button variant="outline" @click="$router.push('/editor')" :disabled="true">TEST</Button>
</template>

<style scoped></style>
